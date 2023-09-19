import { Button, Checkbox, IconButton, Stack, TextField } from '@mui/material';
import {
  MultipleChoiceActivity,
  MultipleChoiceActivityData,
} from '@packages/activity-builder';
import { TextBlock } from '@packages/activity-builder/dist/blocks/text-block';
import { useEffect, useRef, useState } from 'react';

export default function MultipleChoiceActivityEditor({
  onActivityDataChange,
  currentData,
}: {
  onActivityDataChange: (data: object) => any;
  currentData?: MultipleChoiceActivityData;
}) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<TextBlock[]>([]);
  const [isMultipleAnswer, setIsMultipleAnswer] = useState(false);
  const [answerIds, setAnswerIds] = useState<string[]>([]);

  const [showSave, setShowSave] = useState(false);
  const firstTimeRef = useRef(true);

  useEffect(() => {
    if (!firstTimeRef.current) {
      setShowSave(true);
    }
    firstTimeRef.current = false;
  }, [question, options]);

  useEffect(() => {
    if (currentData) {
      setQuestion(currentData.question.text);
    }
  }, [currentData]);

  useEffect(() => {
    // Reset the answers if has multiple answers changes
    setAnswerIds([]);
  }, [isMultipleAnswer]);

  const build = () => {
    const activity = new MultipleChoiceActivity();
    activity.setQuestion(new TextBlock(question));
    activity.setOptions(options);
    activity.setAnswer(answerIds);
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
        label="Question"
      />
      <Stack spacing={2} paddingLeft={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <h3>Options</h3>
          <Stack direction="row" alignItems="center">
            <Checkbox
              size="small"
              title="is multiple answer"
              value={isMultipleAnswer}
              onChange={e => setIsMultipleAnswer(e.target.checked)}
            />
            <p>Has multiple answer?</p>
          </Stack>
        </Stack>
        {options.map((option, index) => {
          return (
            <Stack direction="row" spacing={2} key={index}>
              <TextField
                style={{ flex: 1 }}
                onChange={e => {
                  const newOptions = [...options];
                  options[index].text = e.target.value;
                  setOptions(newOptions);
                }}
                label="Option"
                value={option.text}
              />
              <Checkbox
                checked={answerIds.indexOf(option.id) !== -1}
                onChange={e => {
                  let newAnswerIds = [...answerIds];
                  if (isMultipleAnswer) {
                    if (e.target.checked) {
                      newAnswerIds.push(option.id);
                    } else {
                      newAnswerIds.splice(newAnswerIds.indexOf(option.id), 1);
                    }
                  } else {
                    newAnswerIds = [option.id];
                  }
                  setAnswerIds(newAnswerIds);
                }}
              />
            </Stack>
          );
        })}
        <div>
          <Button
            onClick={() => setOptions(prev => [...prev, new TextBlock('')])}>
            + Add Option
          </Button>
        </div>
      </Stack>

      <div>{showSave && <Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
