import { Button, Stack, TextField } from '@mui/material';
import { TextActivity, TextActivityData } from '@packages/activity-builder';
import { TextBlock } from '@packages/activity-builder/dist/blocks/text-block';
import { useEffect, useState } from 'react';

export default function TextEditor({
  onActivityDataChange,
  currentData,
}: {
  onActivityDataChange: (data: object) => any;
  currentData?: TextActivityData;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentData) {
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

      <div>{<Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
