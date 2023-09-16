'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import ClientModal from '@/lib/components/ClientModal';
import { Lesson } from '@/types/lms';
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export default function CrateLessonModal({
  open,
  onClose,
  defaultUnitId,
}: {
  open: boolean;
  onClose: () => void;
  defaultUnitId?: string | null;
}) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [unitId, setUnitId] = useState('');
  const [order, setOrder] = useState('');

  const {
    isLoading: loading,
    error,
    reset,
    ...addUnitMutation
  } = useMutation(
    ({ title, unitId, order }: Pick<Lesson, 'title' | 'unitId' | 'order'>) =>
      clientFetchApiWithAuth('/admin/lessons/', {
        method: 'POST',
        body: JSON.stringify({
          title,
          unitId,
          order,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lessons']);
        onClose();
      },
    },
  );

  useEffect(() => {
    if (!open) {
      setTitle('');
      setUnitId('');
      setOrder('');
      reset();
    }
    if (open) {
      setUnitId(defaultUnitId || '');
    }
  }, [defaultUnitId, open, reset]);

  return (
    <ClientModal open={open} onClose={onClose}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Lesson Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="For Unit"
          value={unitId}
          onChange={e => setUnitId(e.target.value)}
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
                unitId,
                order: parseInt(order),
              })
            }
            disabled={loading}>
            Create lesson
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
