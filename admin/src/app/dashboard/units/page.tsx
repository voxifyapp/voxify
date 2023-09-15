'use client';

import CreateUnitModal from '@/app/dashboard/units/CreateUnitModal';
import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Course, Unit } from '@/types/lms';
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
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Units() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [modalOpen, setModalOpen] = useState(false);
  const { data: units, isLoading } = useQuery({
    queryKey: ['units'],
    queryFn: async () =>
      await clientFetchApiWithAuth<(Unit & { course: Course })[]>(
        '/admin/units',
        { query: { ...(courseId ? { courseId } : {}) } },
      ),
  });

  return (
    <Box padding={2}>
      <CreateUnitModal
        defaultCourseId={courseId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <TableContainer component={Paper}>
        {isLoading && <CircularProgress />}
        {courseId && <h3>For Course: {courseId}</h3>}
        <Button onClick={() => setModalOpen(true)}>Create Unit</Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>For Course</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units &&
              units.map(unit => (
                <TableRow hover key={unit.id}>
                  <TableCell>{unit.id}</TableCell>
                  <TableCell>{unit.title}</TableCell>
                  <TableCell>{unit.order}</TableCell>
                  <TableCell>{unit.course.title}</TableCell>
                  <TableCell>
                    {dayjs(unit.createdAt).format('DD MMM YYYY')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
