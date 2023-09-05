import { MultipleChoiceActivity } from '@voxify/common/activities/multiple-choice-activity';
import { useCreateMultipleChoiceContext } from '@voxify/modules/main/components/ActivityRenderer/MultipleChoice/multipleChoice.context';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import React from 'react';
import { Button, H3, SelectIcon, Stack, XStack, YStack } from 'tamagui';

type Props = {
  activity: MultipleChoiceActivity;
};

export const MultipleChoice = ({ activity }: Props) => {
  const contextValue = useCreateMultipleChoiceContext({ activity });

  const {
    onOptionSelected,
    userAnswer,
    canFinish,
    isShowResultState,
    setAnswerErrors,
    activityRendererMachineService,
  } = contextValue;

  const onCheckAnswer = () => {
    activityRendererMachineService.send({ type: 'finish', userAnswer });
    const answerErrors = activity.checkAnswer(userAnswer);
    setAnswerErrors(answerErrors);
    activityRendererMachineService.send({
      type: 'set_result',
      result:
        answerErrors?.wrongOptions.length === 0
          ? ActivityResponseResultType.SUCCESS
          : ActivityResponseResultType.FAIL,
      userAnswer,
      answerError: answerErrors,
    });
  };

  return (
    <YStack padding="$3" fullscreen>
      <H3>{activity.getQuestion().text}</H3>
      <XStack
        flexWrap="wrap"
        space="$1.5"
        justifyContent="center"
        marginTop="$6">
        {activity.getOptions().map(option => (
          <Button
            key={option.id}
            icon={
              userAnswer.answer.includes(option.id) ? <SelectIcon /> : undefined
            }
            onPress={() => onOptionSelected(option.id)}
            theme={'green'}>
            {option.text}
          </Button>
        ))}
      </XStack>
      <Stack flex={1} />
      {!isShowResultState && (
        <Button disabled={!canFinish} onPress={onCheckAnswer}>
          Check Answer
        </Button>
      )}
    </YStack>
  );
};
