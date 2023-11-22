import {
  MultipleChoiceActivity,
  MultipleChoiceActivityAnswer,
} from '@packages/activity-builder';
import { TextBlock } from '@packages/activity-builder/dist/blocks/text-block';
import { H3, Subtext } from '@voxify/design_system/typography';
import { ChoiceButton } from '@voxify/modules/main/components/ActivityRenderer/MultipleChoice/components/ChoiceButton';
import { ActivityCardContainer } from '@voxify/modules/main/components/ActivityRenderer/common/ActivityCardContainer';
import React, { useState } from 'react';
import { XStack } from 'tamagui';

type Props = {
  activity: MultipleChoiceActivity;
};

export const MultipleChoice = ({ activity }: Props) => {
  const [userAnswer, setUserAnswer] = useState<MultipleChoiceActivityAnswer>({
    answer: [],
  });

  const onChoicePressed = (choice: TextBlock) => {
    // set answer, if option.id already exists remove it. Or else add it
    setUserAnswer(prev => {
      if (!activity.getIsMultipleAnswer()) {
        return { answer: [choice.id] };
      }
      const newAnswer = [...prev.answer];
      if (newAnswer.includes(choice.id)) {
        newAnswer.splice(newAnswer.indexOf(choice.id), 1);
      } else {
        newAnswer.push(choice.id);
      }
      return {
        answer: newAnswer,
      };
    });
  };

  return (
    <ActivityCardContainer>
      <H3>{activity.getQuestion().text}</H3>
      {activity.getIsMultipleAnswer() && (
        <Subtext color="$color.gray5">Multiple choice</Subtext>
      )}
      <XStack flexWrap="wrap" marginTop="$4">
        {activity.getOptions().map(choice => (
          <ChoiceButton
            key={choice.id}
            checked={!!userAnswer.answer.includes(choice.id)}
            onPress={() => onChoicePressed(choice)}>
            {choice.text}
          </ChoiceButton>
        ))}
      </XStack>
    </ActivityCardContainer>
  );
};
