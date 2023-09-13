'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Course } from '@/types/course';
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
import { useQuery } from 'react-query';

export default function Courses() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () =>
      await clientFetchApiWithAuth<Course[]>('/admin/courses'),
  });

  return (
    <TableContainer component={Paper}>
      {isLoading && <CircularProgress />}
      <Link href="/dashboard/courses/create-edit">
        <Button>Create Course</Button>
      </Link>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Proficiency Level</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses &&
            courses.map(course => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.proficiencyLevel}</TableCell>
                <TableCell>
                  {dayjs(course.createdAt).format('DD MMM YYYY')}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
