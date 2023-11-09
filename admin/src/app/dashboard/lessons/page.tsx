'use client';

import PublishButton from '@/app/dashboard/components/PublishButton';
import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Lesson, Unit } from '@/types/lms';
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
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Units() {
  const [hideUnpublishedContent, setHideUnpublishedContent] = useState(true);

  const searchParams = useSearchParams();
  const unitId = searchParams.get('unitId');

  const { data: lessons, isLoading } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () =>
      await clientFetchApiWithAuth<(Lesson & { unit?: Unit })[]>(
        '/admin/lessons',
        { query: { ...(unitId ? { unitId } : {}) } },
      ),
  });

  const filteredLessons = lessons?.filter(lesson =>
    hideUnpublishedContent ? lesson.published === true : true,
  );

  return (
    <Box padding={2}>
      <TableContainer component={Paper}>
        {isLoading && <CircularProgress />}
        {unitId && <h3>For Unit: {unitId}</h3>}
        <Box padding={2} display="flex" flexDirection="row">
          <Link
            href={{
              pathname: '/dashboard/lessons/create-edit',
              query: { unitId },
            }}>
            <Button variant="contained">Create Lesson</Button>
          </Link>
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

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>For Unit</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLessons &&
              filteredLessons.map(lesson => (
                <TableRow hover key={lesson.id}>
                  <TableCell>
                    <Link
                      href={{
                        pathname: '/dashboard/activities',
                        query: { lessonId: lesson.id },
                      }}>
                      {lesson.id}
                    </Link>
                  </TableCell>
                  <TableCell>{lesson.title}</TableCell>
                  <TableCell>{lesson.order}</TableCell>
                  <TableCell>{lesson.unit?.title}</TableCell>
                  <TableCell>
                    {dayjs(lesson.createdAt).format('DD MMM YYYY')}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <Link
                        href={{
                          pathname: '/dashboard/lessons/create-edit',
                          query: { lessonId: lesson.id },
                        }}>
                        <Button>Edit</Button>
                      </Link>
                      <PublishButton
                        isPublished={lesson.published}
                        invalidations={['lessons']}
                        type="lessons"
                        entityId={lesson.id}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
