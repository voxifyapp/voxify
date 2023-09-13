'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import Modal from '@/lib/components/Modal';
import { Course } from '@/types/course';
import { ProficiencyLevel } from '@/types/profile';
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export default function CreateCourseModal() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState<ProficiencyLevel>(
    ProficiencyLevel.BEGINNER,
  );

  const { isLoading: loading, ...addCourseMutation } = useMutation(
    ({ title, proficiencyLevel }: Pick<Course, 'title' | 'proficiencyLevel'>) =>
      clientFetchApiWithAuth('/admin/courses/', {
        method: 'POST',
        body: JSON.stringify({
          title,
          proficiencyLevel,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['courses']);
        router.back();
      },
    },
  );

  return (
    <Modal>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Course Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Select
          value={proficiencyLevel}
          onChange={e =>
            setProficiencyLevel(e.target.value as ProficiencyLevel)
          }>
          <MenuItem value={ProficiencyLevel.BEGINNER}>Beginner</MenuItem>
          <MenuItem value={ProficiencyLevel.MEDIUM}>Medium</MenuItem>
          <MenuItem value={ProficiencyLevel.ADVANCED}>Advanced</MenuItem>
        </Select>
        <Stack direction={'row'}>
          <Button
            onClick={() =>
              addCourseMutation.mutate({ title, proficiencyLevel })
            }
            disabled={loading}>
            Create course
          </Button>
          {loading && <CircularProgress />}
        </Stack>
      </Stack>
    </Modal>
  );
}
