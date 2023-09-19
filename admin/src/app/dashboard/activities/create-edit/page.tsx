'use client';

import ActivityEditor from '@/app/dashboard/activities/create-edit/components/ActivityEditor';
import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Activity, ActivityType } from '@/types/lms';
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function CreateActivity() {
  const searchParams = useSearchParams();
  const activityId = searchParams.get('activityId');
  const router = useRouter();
  const queryClient = useQueryClient();
  const [lessonId, setLessonId] = useState('');
  const [order, setOrder] = useState('');
  const [activityType, setActivityType] = useState<ActivityType>(
    ActivityType.FILL_IN_THE_BLANKS,
  );
  const [activityData, setActivityData] = useState<object | null>(null);

  const { data } = useQuery({
    queryKey: ['activity', activityId],
    queryFn: () =>
      clientFetchApiWithAuth<Activity>(`/admin/activities/${activityId}`),
    enabled: !!activityId,
    onSuccess: (activity: Activity) => {
      setLessonId(activity.lessonId || '');
      setOrder(String(activity.order));
      setActivityType(activity.type);
      setActivityData(activity.data);
    },
  });

  const {
    isLoading: loading,
    error,
    mutate,
  } = useMutation(
    () =>
      clientFetchApiWithAuth('/admin/activities/', {
        method: 'POST',
        body: JSON.stringify({
          type: activityType,
          lessonId: lessonId || null,
          order,
          data: activityData,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['activities']);
        router.back();
      },
    },
  );

  const save = async () => {
    await mutate();
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      <Stack width="1200px" maxWidth="100%" spacing={2}>
        <h1>Create activity</h1>
        <TextField
          fullWidth
          label="For Lesson"
          value={lessonId}
          onChange={e => setLessonId(e.target.value)}
        />

        <TextField
          fullWidth
          label="Order"
          value={order}
          type="number"
          onChange={e => setOrder(e.target.value)}
        />
        <Select
          value={activityType}
          onChange={e => setActivityType(e.target.value as ActivityType)}>
          {Object.values(ActivityType).map(key => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>

        <ActivityEditor
          initialData={data?.data}
          onActivityDataChange={(data: object) => setActivityData(data)}
          type={activityType}
        />

        <Button
          onClick={save}
          variant="contained"
          disabled={!order || !activityData || loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>

        {error ? (
          <Alert severity="error">{(error as any).message}</Alert>
        ) : null}
      </Stack>
    </Box>
  );
}
