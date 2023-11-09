'use client';

import { useUpdateOrderMutation } from '@/app/dashboard/activities/mutations';
import PublishButton from '@/app/dashboard/components/PublishButton';
import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Activity, Lesson } from '@/types/lms';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';
import { chunk, sortBy } from 'lodash';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

type ActivityWithLesson = Activity & { lesson?: Lesson };

export default function Units() {
  const { mutateAsync, isLoading: updatingRestoreOrder } =
    useUpdateOrderMutation();
  const queryClient = useQueryClient();

  const [hideUnpublishedContent, setHideUnpublishedContent] = useState(true);

  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lessonId');

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () =>
      await clientFetchApiWithAuth<ActivityWithLesson[]>('/admin/activities', {
        query: { ...(lessonId ? { lessonId } : {}) },
      }),
  });

  const filteredActivities = sortBy(
    activities?.filter(activity =>
      hideUnpublishedContent ? activity.published === true : true,
    ),
    activity => activity.order,
  );

  const restoreOrder = async () => {
    // Batch it
    const BATCH_SIZE = 10;
    const chunks = chunk(filteredActivities, BATCH_SIZE);

    for (let [chunkIndex, chunk] of chunks.entries()) {
      await Promise.all(
        chunk.map((activity, activityIndex) =>
          mutateAsync({
            activityId: activity.id,
            order: (chunkIndex * BATCH_SIZE + activityIndex) * 10,
          }),
        ),
      );
    }

    await queryClient.invalidateQueries(['activities']);
  };

  return (
    <Box padding={2}>
      <TableContainer component={Paper}>
        <Box padding={2} display="flex" flexDirection="row">
          <Link
            href={{
              pathname: '/dashboard/activities/create-edit',
              query: { lessonId },
            }}>
            <Button variant="contained">Create Activity</Button>
          </Link>

          {lessonId && (
            <Button
              disabled={updatingRestoreOrder}
              onClick={restoreOrder}
              sx={{ ml: 2 }}
              variant="contained">
              {updatingRestoreOrder ? 'Loading...' : 'Restore Order'}
            </Button>
          )}

          <Box flex={1} />
          <FormControlLabel
            control={
              <Checkbox
                checked={hideUnpublishedContent}
                onChange={e => setHideUnpublishedContent(e.target.checked)}
              />
            }
            label="Hide unpublished content"
          />
        </Box>
        {isLoading && <CircularProgress />}
        {lessonId && <h3>For Lesson: {lessonId}</h3>}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>For Lesson</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredActivities &&
              filteredActivities.map(activity => (
                <ActivityRow key={activity.id} activity={activity} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const ActivityRow = ({ activity }: { activity: ActivityWithLesson }) => {
  return (
    <TableRow hover>
      <TableCell>
        <Link
          href={{
            pathname: '/dashboard/activities/create-edit',
            query: {
              activityId: activity.id,
            },
          }}>
          {activity.id}
        </Link>
      </TableCell>
      <TableCell>{activity.type}</TableCell>
      <TableCell>{activity.order}</TableCell>
      <TableCell>{activity.lesson?.title}</TableCell>
      <TableCell>{dayjs(activity.createdAt).format('DD MMM YYYY')}</TableCell>
      <TableCell>
        <Stack direction="row">
          <PublishButton
            isPublished={activity.published}
            invalidations={['activities']}
            type="activities"
            entityId={activity.id}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};
