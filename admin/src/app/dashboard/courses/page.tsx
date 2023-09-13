import { fetchApiWithAuth } from '@/lib/fetch';
import { getFirebaseTokenForRequest } from '@/lib/firebaseAdmin';
import { Course } from '@/types/course';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dayjs from 'dayjs';

export default async function Courses() {
  const courses = await fetchApiWithAuth<Course[]>('/admin/courses');

  return (
    <TableContainer component={Paper}>
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
          {courses.map(course => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.proficiencyLevel}</TableCell>
              <TableCell>{dayjs(course.createdAt).format('DD MMM YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
