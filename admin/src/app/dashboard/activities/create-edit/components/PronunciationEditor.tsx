import { Button, Stack, TextField } from '@mui/material';
import {
  PronunciationActivity,
  PronunciationActivityData,
} from '@packages/activity-builder';
import { TextBlock } from '@packages/activity-builder/dist/blocks/text-block';
import { useEffect, useRef, useState } from 'react';

export default function PronunciationActivityEditor({
  onActivityDataChange,
  currentData,
}: {
  onActivityDataChange: (data: object) => any;
  currentData?: PronunciationActivityData;
}) {
  const [prompt, setPrompt] = useState('');

  const [showSave, setShowSave] = useState(false);
  const firstTimeRef = useRef(true);

  useEffect(() => {
    if (!firstTimeRef.current) {
      setShowSave(true);
    }
    firstTimeRef.current = false;
  }, [prompt]);

  useEffect(() => {
    if (currentData) {
      setPrompt(currentData.prompt.text);
    }
  }, [currentData]);

  const build = () => {
    const activity = new PronunciationActivity();
    activity.setPrompt(new TextBlock(prompt));
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
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        label="What to say"
      />
      <div>{showSave && <Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
