'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Lesson, Unit } from '@/types/lms';
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function CrateLessonModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const lessonId = searchParams.get('lessonId') || '';
  const forUnitId = searchParams.get('unitId') || '';

  const [title, setTitle] = useState('');
  const [unitId, setUnitId] = useState(forUnitId);
  const [order, setOrder] = useState('');
  const [homeImageFileName, setHomeImageFileName] = useState('');

  const { data: lessonEntity } = useQuery({
    queryKey: ['lessons', lessonId],
    queryFn: () => clientFetchApiWithAuth<Lesson>(`/admin/lessons/${lessonId}`),
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (lessonEntity) {
      setTitle(lessonEntity.title);
      setOrder(lessonEntity.order + '');
      setUnitId(lessonEntity.unitId || '');
      setHomeImageFileName(lessonEntity.homeImageFileName || '');
    }
  }, [lessonEntity]);

  const {
    isLoading: loading,
    error,
    reset,
    ...addUnitMutation
  } = useMutation(
    ({
      title,
      unitId,
      order,
    }: Pick<Lesson, 'title' | 'unitId' | 'order' | 'homeImageFileName'>) =>
      clientFetchApiWithAuth(`/admin/lessons/${lessonId}`, {
        method: lessonId ? 'PATCH' : 'POST',
        body: JSON.stringify({
          title,
          unitId: unitId || undefined,
          order,
          homeImageFileName: homeImageFileName || null,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lessons']);
        router.back();
      },
    },
  );

  return (
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

      <TextField
        fullWidth
        label="Homepage image on the app"
        helperText="this image is shown on the lesson in the home page of the app."
        value={homeImageFileName}
        onChange={e => setHomeImageFileName(e.target.value)}
      />

      <Stack direction={'row'}>
        <Button
          onClick={() =>
            addUnitMutation.mutate({
              title,
              unitId,
              order: parseInt(order),
              homeImageFileName,
            })
          }
          disabled={loading}>
          {lessonId ? 'Edit' : 'Create'} lesson
        </Button>
        {loading && <CircularProgress />}
      </Stack>
      {error ? <Alert severity="error">{(error as any).message}</Alert> : null}
    </Stack>
  );
}
