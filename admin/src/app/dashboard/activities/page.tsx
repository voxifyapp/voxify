'use client';

import PublishButton from '@/app/dashboard/components/PublishButton';
import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Activity, Lesson } from '@/types/lms';
import {
  Box,
  Button,
  CircularProgress,
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
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';

type ActivityWithLesson = Activity & { lesson?: Lesson };

export default function Units() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lessonId');

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () =>
      await clientFetchApiWithAuth<ActivityWithLesson[]>('/admin/activities', {
        query: { ...(lessonId ? { lessonId } : {}) },
      }),
  });

  return (
    <Box padding={2}>
      <TableContainer component={Paper}>
        <Link
          href={{
            pathname: '/dashboard/activities/create-edit',
            query: { lessonId },
          }}>
          <Button>Create Activity</Button>
        </Link>
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
            {activities &&
              activities.map(activity => (
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
