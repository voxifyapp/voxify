import {
  FormASentenceActivity,
  FormASentenceActivityAnswer,
} from '@packages/activity-builder';
import React from 'react';
import { useState } from 'react';
import { Button, H3, XStack, YStack } from 'tamagui';

type Props = {
  activity: FormASentenceActivity;
};

export const FormASentence = ({ activity }: Props) => {
  const [userAnswer, setUserAnswer] = useState<FormASentenceActivityAnswer>({
    answer: [],
  });

  const words = activity.getWords();
  const remainingWords = [...words];
  userAnswer.answer.forEach(word => {
    const index = remainingWords.indexOf(word);
    if (index !== -1) {
      remainingWords.splice(index, 1);
    }
  });

  return (
    <YStack>
      <H3>{activity.getPrompt().text}</H3>
      <XStack flexWrap="wrap" marginTop="$6">
        {userAnswer.answer.map((word, index) => (
          <Button
            key={index}
            onPress={() => {
              setUserAnswer(prev => {
                const newAnswer = [...prev.answer];
                newAnswer.splice(index, 1);
                return {
                  answer: newAnswer,
                };
              });
            }}
            theme={'green'}>
            {word}
          </Button>
        ))}
      </XStack>
      <XStack flexWrap="wrap" space="$3" marginTop="$6">
        {remainingWords.map((word, index) => (
          <Button
            key={index}
            onPress={() => {
              setUserAnswer(prev => ({ answer: [...prev.answer, word] }));
            }}
            theme={'green'}>
            {word}
          </Button>
        ))}
      </XStack>
    </YStack>
  );
};
