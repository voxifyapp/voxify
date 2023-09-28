'use client';

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
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';

export default function Units() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
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
      <TableContainer component={Paper}>
        {isLoading && <CircularProgress />}
        {courseId && <h3>For Course: {courseId}</h3>}
        <Link
          href={{
            pathname: '/dashboard/units/create-edit',
            query: { courseId },
          }}>
          <Button>Create Unit</Button>
        </Link>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>For Course</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units &&
              units.map(unit => (
                <TableRow hover key={unit.id}>
                  <TableCell>
                    <Link
                      href={{
                        pathname: '/dashboard/lessons',
                        query: { unitId: unit.id },
                      }}>
                      {unit.id}
                    </Link>
                  </TableCell>
                  <TableCell>{unit.title}</TableCell>
                  <TableCell>{unit.order}</TableCell>
                  <TableCell>{unit.course.title}</TableCell>
                  <TableCell>
                    {dayjs(unit.createdAt).format('DD MMM YYYY')}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: '/dashboard/units/create-edit',
                        query: { unitId: unit.id },
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
