'use client';

import CreateUnitModal from '@/app/dashboard/units/CreateUnitModal';
import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Course, Unit } from '@/types/lms';
import {
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
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Units() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { data: units, isLoading } = useQuery({
    queryKey: ['units'],
    queryFn: async () =>
      await clientFetchApiWithAuth<(Unit & { course: Course })[]>(
        '/admin/units',
      ),
  });

  const { courseId } = useSearchParams() as { courseId?: string };

  return (
    <>
      <CreateUnitModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <TableContainer component={Paper}>
        {isLoading && <CircularProgress />}
        {courseId && <h1>For Course: {courseId}</h1>}
        <Button onClick={() => setModalOpen(true)}>Create Unit</Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
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
                  <TableCell>{unit.course.title}</TableCell>
                  <TableCell>
                    {dayjs(unit.createdAt).format('DD MMM YYYY')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
