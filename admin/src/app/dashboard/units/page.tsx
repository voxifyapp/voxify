'use client';

import PublishButton from '@/app/dashboard/components/PublishButton';
import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Course, Unit } from '@/types/lms';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
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
  const [hideUnpublishedContent, setHideUnpublishedContent] = useState(true);

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

  const filteredUnits = units?.filter(unit =>
    hideUnpublishedContent ? unit.published === true : true,
  );

  return (
    <Box padding={2}>
      <TableContainer component={Paper}>
        {isLoading && <CircularProgress />}
        {courseId && <h3>For Course: {courseId}</h3>}
        <Box padding={2} display="flex" flexDirection="row">
          <Link
            href={{
              pathname: '/dashboard/units/create-edit',
              query: { courseId },
            }}>
            <Button variant="contained">Create Unit</Button>
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
              <TableCell>For Course</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUnits &&
              filteredUnits.map(unit => (
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
                    <PublishButton
                      isPublished={unit.published}
                      type="units"
                      entityId={unit.id}
                      invalidations={['units']}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
