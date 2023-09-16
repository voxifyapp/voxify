'use client';

import { ActivityType } from '@/types/lms';
import { Box, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useState } from 'react';

export default function CreateActivity() {
  const [lessonId, setLessonId] = useState('');
  const [order, setOrder] = useState('');
  const [activityType, setActivityType] = useState<ActivityType>(
    ActivityType.FILL_IN_THE_BLANKS,
  );

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
          {Object.keys(ActivityType).map(key => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
}
