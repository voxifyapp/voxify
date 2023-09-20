import { Button, Stack, TextField } from '@mui/material';
import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityData,
} from '@packages/activity-builder';
import { TextBlock } from '@packages/activity-builder/dist/blocks/text-block';
import { useEffect, useRef, useState } from 'react';

export default function FillInTheBlanksActivityEditor({
  onActivityDataChange,
  currentData,
}: {
  onActivityDataChange: (data: object) => any;
  currentData?: FillInTheBlanksActivityData;
}) {
  const [question, setQuestion] = useState('');

  const [showSave, setShowSave] = useState(false);
  const firstTimeRef = useRef(true);

  useEffect(() => {
    if (!firstTimeRef.current) {
      setShowSave(true);
    }
    firstTimeRef.current = false;
  }, [question]);

  useEffect(() => {
    if (currentData) {
      setQuestion(currentData.question.text);
    }
  }, [currentData]);

  const build = () => {
    const activity = new FillInTheBlanksActivity();
    activity.setQuestion(new TextBlock(question));
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
        value={question}
        onChange={e => setQuestion(e.target.value)}
        label="What to say"
      />
      <div>{showSave && <Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
