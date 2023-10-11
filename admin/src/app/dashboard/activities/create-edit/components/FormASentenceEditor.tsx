import { Button, Stack, TextField } from '@mui/material';
import {
  FormASentenceActivity,
  FormASentenceActivityData,
} from '@packages/activity-builder';
import { TextBlock } from '@packages/activity-builder/dist/blocks/text-block';
import { flattenDeep, merge } from 'lodash';
import { useEffect, useState } from 'react';

export default function FormASentenceEditor({
  onActivityDataChange,
  currentData,
}: {
  onActivityDataChange: (data: object) => any;
  currentData?: FormASentenceActivityData;
}) {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [otherOptions, setOtherOptions] = useState<string[]>([]);

  const requiredOptions = flattenDeep(
    answer
      .split(' ')
      .map(answerToken => answerToken.split(/([.,!?;])/).filter(Boolean)),
  );

  const answerArray = flattenDeep(
    answer
      .split(' ')
      .map(answerToken => answerToken.split(/([.,!?;])/).filter(Boolean)),
  );

  useEffect(() => {
    if (currentData) {
      setPrompt(currentData.prompt.text);
      setAnswer(currentData.answer.join(' '));

      const answerTracker: (string | null)[] = [...currentData.answer];
      setOtherOptions(
        currentData.words.filter(option => {
          const optionIndexInAnswer = answerTracker.indexOf(option);
          // If the answer word has already come up, let's remove if for the next loop
          // For eg: if the answer has a word "N" times, then any other occurrence of the word should be optional
          if (optionIndexInAnswer !== -1)
            answerTracker[optionIndexInAnswer] = null;
          return optionIndexInAnswer === -1;
        }),
      );
    }
  }, [currentData]);

  const build = () => {
    const activity = new FormASentenceActivity();
    activity.setPrompt(new TextBlock(prompt));
    activity.setAnswer(answerArray);
    activity.setWords([...requiredOptions, ...otherOptions]);
    try {
      const activityData = activity.build();
      onActivityDataChange(activityData);
      alert('Saved');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Stack spacing={2} padding={2}>
      <TextField
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        label="Prompt"
      />
      <TextField
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        label="Final sentence"
      />
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        {requiredOptions.map((option, index) => (
          <TextField
            key={index}
            value={option}
            disabled
            style={{ paddingBottom: 12 }}
          />
        ))}

        {otherOptions.map((option, index) => (
          <TextField
            key={index}
            value={option}
            style={{ paddingBottom: 12 }}
            onChange={e =>
              setOtherOptions(prev =>
                merge([...prev], { [index]: e.target.value }),
              )
            }
          />
        ))}

        <Button onClick={() => setOtherOptions(prev => [...prev, ''])}>
          Add option
        </Button>
      </Stack>
      <div>{<Button onClick={() => build()}>Save</Button>}</div>
    </Stack>
  );
}
