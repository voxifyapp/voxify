'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Unit } from '@/types/lms';
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function CreateUnitModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const forCourseId = searchParams.get('courseId') || '';
  const unitId = searchParams.get('unitId') || '';

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(forCourseId);
  const [order, setOrder] = useState('');

  useQuery({
    queryKey: ['units', unitId],
    queryFn: () => clientFetchApiWithAuth<Unit>(`/admin/units/${unitId}`),
    enabled: !!unitId,
    onSuccess: unit => {
      setCourseId(unit.courseId || '');
      setOrder(String(unit.order));
      setTitle(unit.title);
    },
  });

  const {
    isLoading: loading,
    error,
    reset,
    ...addUnitMutation
  } = useMutation(
    ({ title, courseId, order }: Pick<Unit, 'title' | 'courseId' | 'order'>) =>
      clientFetchApiWithAuth(`/admin/units/${unitId}`, {
        method: unitId ? 'PATCH' : 'POST',
        body: JSON.stringify({
          title,
          courseId,
          order,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['units']);
        router.back();
      },
    },
  );

  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        label="Unit Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <TextField
        fullWidth
        label="For Course"
        value={courseId}
        onChange={e => setCourseId(e.target.value)}
      />

      <TextField
        fullWidth
        label="Order"
        value={order}
        type="number"
        onChange={e => setOrder(e.target.value)}
      />

      <Stack direction={'row'}>
        <Button
          onClick={() =>
            addUnitMutation.mutate({
              title,
              courseId,
              order: parseInt(order),
            })
          }
          disabled={loading}>
          {unitId ? 'Edit' : 'Create'} unit
        </Button>
        {loading && <CircularProgress />}
      </Stack>
      {error ? <Alert severity="error">{(error as any).message}</Alert> : null}
    </Stack>
  );
}
