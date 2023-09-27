'use client';

import CrateLessonModal from '@/app/dashboard/lessons/CreateLessonModal';
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
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Units() {
  const searchParams = useSearchParams();
  const unitId = searchParams.get('unitId');

  const [modalOpen, setModalOpen] = useState(false);
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
      <CrateLessonModal
        defaultUnitId={unitId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <TableContainer component={Paper}>
        {isLoading && <CircularProgress />}
        {unitId && <h3>For Unit: {unitId}</h3>}
        <Button onClick={() => setModalOpen(true)}>Create Lesson</Button>

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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
