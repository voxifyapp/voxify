'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import ClientModal from '@/lib/components/ClientModal';
import { Unit } from '@/types/lms';
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export default function CreateUnitModal({
  open,
  onClose,
  defaultCourseId,
}: {
  open: boolean;
  onClose: () => void;
  defaultCourseId?: string | null;
}) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [order, setOrder] = useState('');

  const {
    isLoading: loading,
    error,
    reset,
    ...addUnitMutation
  } = useMutation(
    ({ title, courseId, order }: Pick<Unit, 'title' | 'courseId' | 'order'>) =>
      clientFetchApiWithAuth('/admin/units/', {
        method: 'POST',
        body: JSON.stringify({
          title,
          courseId,
          order,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['units']);
        onClose();
      },
    },
  );

  useEffect(() => {
    if (!open) {
      setTitle('');
      setCourseId('');
      setOrder('');
      reset();
    }
    if (open) {
      setCourseId(defaultCourseId || '');
    }
  }, [defaultCourseId, open, reset]);

  return (
    <ClientModal open={open} onClose={onClose}>
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
            Create unit
          </Button>
          {loading && <CircularProgress />}
        </Stack>
        {error ? (
          <Alert severity="error">{(error as any).message}</Alert>
        ) : null}
      </Stack>
    </ClientModal>
  );
}
