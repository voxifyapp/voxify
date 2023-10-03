import { Button, Checkbox, Stack, TextField } from '@mui/material';
import {
  TextActivity,
  TextActivityData,
} from '@packages/activity-builder';
import { TextBlock } from '@packages/activity-builder/dist/blocks/text-block';
import { useEffect, useRef, useState } from 'react';

export default function TextEditor({
  onActivityDataChange,
  currentData,
}: {
  onActivityDataChange: (data: object) => any;
  currentData?: TextActivityData;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [showSave, setShowSave] = useState(false);
  const firstTimeRef = useRef(true);

  useEffect(() => {
    if (!firstTimeRef.current) {
      setShowSave(true);
    }
    firstTimeRef.current = false;
  }, [title, description]);

  useEffect(() => {
    if (currentData) {
      const parsedActivity = new TextActivity(currentData);
      setTitle(currentData.title.text);
      setDescription(currentData.description.text);
    }
  }, [currentData]);

  const build = () => {
    const activity = new TextActivity();
    activity.setTitle(new TextBlock(title));
    activity.setDescription(new TextBlock(description));
    try {
      const activityData = activity.build();
      onActivityDataChange(activityData);
      setShowSave(false);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Stack spacing={2} padding={2}>
      <TextField
        value={title}
        onChange={e => setTitle(e.target.value)}
        label="Title"
      />
      <TextField
        value={description}
        onChange={e => setDescription(e.target.value)}
        label="Description"
      />

      <div>{showSave && <Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
