import { FormASentenceActivity } from '@packages/activity-builder';
import { FormASentenceButton } from '@voxify/modules/main/components/ActivityRenderer/FormASentence/components/FormASentenceButton';
import { useCreateFormASentenceContext } from '@voxify/modules/main/components/ActivityRenderer/FormASentence/formASentence.context';
import { ActivityCardContainer } from '@voxify/modules/main/components/ActivityRenderer/common/ActivityCardContainer';
import { countBy } from 'lodash';
import React from 'react';
import { Button, H3, XStack } from 'tamagui';

type Props = {
  activity: FormASentenceActivity;
};

export const FormASentence = ({ activity }: Props) => {
  const context = useCreateFormASentenceContext({
    activity,
  });
  const { userAnswer, addWord, removeWord } = context;

  const words = activity.getWords();
  const remainingWordsCount = countBy(words);
  userAnswer.answer.forEach(word => {
    remainingWordsCount[word]--;
  });

  const uniqueWords = [...new Set(words)];

  return (
    <ActivityCardContainer>
      <H3>{activity.getPrompt().text}</H3>
      <XStack flexWrap="wrap" marginTop="$3">
        {userAnswer.answer.map((word, index) => (
          <Button
            key={index}
            onPress={() => {
              removeWord(index);
            }}>
            {word}
          </Button>
        ))}
      </XStack>
      <XStack justifyContent="center" flexWrap="wrap" mt="$4">
        {uniqueWords.map((word, index) => {
          const numberOfRemainingWordUses = remainingWordsCount[word];
          return (
            <FormASentenceButton
              marginRight="$2"
              marginBottom="$2"
              key={index}
              wordUsed={numberOfRemainingWordUses <= 0}
              onPress={() => {
                addWord(word);
              }}>
              {`${word}${
                numberOfRemainingWordUses > 1
                  ? ` (${numberOfRemainingWordUses})`
                  : ''
              }`}
            </FormASentenceButton>
          );
        })}
      </XStack>
    </ActivityCardContainer>
  );
};
