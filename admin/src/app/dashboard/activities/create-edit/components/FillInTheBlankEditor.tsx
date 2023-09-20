import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityData,
} from '@packages/activity-builder';
import { TextBlock } from '@packages/activity-builder/dist/blocks/text-block';
import { pick } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function FillInTheBlanksActivityEditor({
  onActivityDataChange,
  currentData,
}: {
  onActivityDataChange: (data: object) => any;
  currentData?: FillInTheBlanksActivityData;
}) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<Record<string, string>>({});

  const blanks = useMemo(
    () => FillInTheBlanksActivity.getBlanksFromQuestion(question),
    [question],
  );
  const nextGeneratedBlankId = `$$blank_${Math.floor(Math.random() * 100)}$$`;

  useEffect(() => {
    if (currentData) {
      setQuestion(currentData.question.text);
      setOptions(currentData.options);
      setAnswer(currentData.answer);
    }
  }, [currentData]);

  const build = () => {
    const activity = new FillInTheBlanksActivity();
    activity.setQuestion(new TextBlock(question));
    activity.setOptions(options);
    console.log(answer);
    console.log(pick(answer, blanks));
    activity.setAnswer(pick(answer, blanks));
    try {
      const activityData = activity.build();
      onActivityDataChange(activityData);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Stack spacing={2} padding={2}>
      <Stack direction="row" spacing={2} alignItems={'center'}>
        <TextField
          fullWidth
          value={question}
          onChange={e => setQuestion(e.target.value)}
          label="Sentence"
        />
        <Button
          onClick={() => setQuestion(prev => prev + nextGeneratedBlankId)}>
          Add Blank
        </Button>
      </Stack>
      <Stack spacing={2} paddingLeft={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <h3>Options</h3>
          <Button onClick={() => setOptions(prev => [...prev, ''])}>
            Add option
          </Button>
        </Stack>

        {options.map((option, index) => {
          return (
            <Stack direction="row" spacing={2} key={index}>
              <TextField
                style={{ flex: 1 }}
                onChange={e => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                label="Option"
                value={option}
              />
              <Button
                onClick={() =>
                  setOptions(prev => prev.filter((_, idx) => index != idx))
                }>
                Remove
              </Button>
            </Stack>
          );
        })}
      </Stack>

      <Stack spacing={2} paddingLeft={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <h3>Answer</h3>
        </Stack>

        {blanks.map(blank => (
          <Stack direction="row" spacing={2} key={blank} alignItems="center">
            <h3>{blank}</h3>
            <Select
              style={{ width: 150 }}
              value={answer[blank]}
              onChange={e =>
                setAnswer(prev => ({ ...prev, [blank]: e.target.value }))
              }>
              {options.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
              <MenuItem value={undefined}>None</MenuItem>
            </Select>
          </Stack>
        ))}
      </Stack>
      <div>{true && <Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
