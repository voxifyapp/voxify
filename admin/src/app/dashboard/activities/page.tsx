'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Activity, Lesson } from '@/types/lms';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
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

export default function Units() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get('lessonId');

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () =>
      await clientFetchApiWithAuth<(Activity & { lesson?: Lesson })[]>(
        '/admin/activities',
        { query: { ...(lessonId ? { lessonId } : {}) } },
      ),
  });

  return (
    <Box padding={2}>
      <TableContainer component={Paper}>
        <Link href={{ pathname: '/dashboard/activities/create-activity' }}>
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
              <TableCell>For Unit</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities &&
              activities.map(activity => (
                <TableRow hover key={activity.id}>
                  <TableCell>{activity.id}</TableCell>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.order}</TableCell>
                  <TableCell>{activity.lesson?.title}</TableCell>
                  <TableCell>
                    {dayjs(activity.createdAt).format('DD MMM YYYY')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
