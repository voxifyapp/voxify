import {
  MultipleChoiceActivity,
  MultipleChoiceActivityAnswer,
} from '@packages/activity-builder';
import React, { useState } from 'react';
import { Button, H3, SelectIcon, XStack, YStack } from 'tamagui';

type Props = {
  activity: MultipleChoiceActivity;
};

export const MultipleChoice = ({ activity }: Props) => {
  const [userAnswer, setUserAnswer] = useState<MultipleChoiceActivityAnswer>({
    answer: [],
  });

  return (
    <YStack>
      <H3>{activity.getQuestion().text}</H3>
      <XStack flexWrap="wrap" space="$3" spaceDirection="both" marginTop="$6">
        {activity.getOptions().map(option => (
          <Button
            key={option.id}
            icon={
              userAnswer.answer.includes(option.id) ? <SelectIcon /> : undefined
            }
            onPress={() => {
              // set answer, if option.id already exists remove it. Or else add it
              setUserAnswer(prev => {
                if (!activity.getIsMultipleAnswer()) {
                  return { answer: [option.id] };
                }
                const newAnswer = [...prev.answer];
                if (newAnswer.includes(option.id)) {
                  newAnswer.splice(newAnswer.indexOf(option.id), 1);
                } else {
                  newAnswer.push(option.id);
                }
                return {
                  answer: newAnswer,
                };
              });
            }}
            theme={'green'}>
            {option.text}
          </Button>
        ))}
      </XStack>
    </YStack>
  );
};
