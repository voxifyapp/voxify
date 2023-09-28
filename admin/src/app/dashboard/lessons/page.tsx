'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Lesson, Unit } from '@/types/lms';
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
  const unitId = searchParams.get('unitId');

  const { data: lessons, isLoading } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () =>
      await clientFetchApiWithAuth<(Lesson & { unit?: Unit })[]>(
        '/admin/lessons',
        { query: { ...(unitId ? { unitId } : {}) } },
      ),
  });

  return (
    <Box padding={2}>
      <TableContainer component={Paper}>
        {isLoading && <CircularProgress />}
        {unitId && <h3>For Unit: {unitId}</h3>}
        <Link
          href={{
            pathname: '/dashboard/lessons/create-edit',
            query: { unitId },
          }}>
          <Button>Create Lesson</Button>
        </Link>

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
            {lessons &&
              lessons.map(lesson => (
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
                    <Link
                      href={{
                        pathname: '/dashboard/lessons/create-edit',
                        query: { lessonId: lesson.id },
                      }}>
                      <Button>Edit</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
