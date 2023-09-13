'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import Modal from '@/lib/components/Modal';
import { ProficiencyLevel } from '@/types/profile';
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCourseModal() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState<ProficiencyLevel>(
    ProficiencyLevel.BEGINNER,
  );
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setLoading(true);
    try {
      await clientFetchApiWithAuth('/admin/courses/', {
        method: 'POST',
        body: JSON.stringify({
          title,
          proficiencyLevel,
        }),
      });
    } catch (err: any) {
      alert(err.message);
    }

    router.back();
    setLoading(false);
  };

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
          <Button onClick={onCreate} disabled={loading}>
            Create course
          </Button>
          {loading && <CircularProgress />}
        </Stack>
      </Stack>
    </Modal>
  );
}
