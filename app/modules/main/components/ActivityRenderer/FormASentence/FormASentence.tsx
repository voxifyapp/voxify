import { FormASentenceActivity } from '@voxify/common/activities/form-a-sentence-activity';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { useCreateFormASentenceContext } from '@voxify/modules/main/components/ActivityRenderer/FormASentence/formASentenceContext';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import React from 'react';
import { Button, H3, Stack, XStack, YStack } from 'tamagui';

type Props = {
  activity: FormASentenceActivity;
};

export const FormASentence = ({ activity }: Props) => {
  const contextValue = useCreateFormASentenceContext({ activity });
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const { userAnswer, wordBank, setAnswerErrors, removeWord, addWord } =
    contextValue;

  const onCheckAnswer = () => {
    activityRendererMachineService.send({ type: 'finish', userAnswer });
    const answerErrors = activity.checkAnswer(userAnswer);
    setAnswerErrors(answerErrors);
    activityRendererMachineService.send({
      type: 'set_result',
      result: answerErrors?.correct
        ? ActivityResponseResultType.SUCCESS
        : ActivityResponseResultType.FAIL,
      userAnswer,
      answerError: answerErrors,
    });
  };

  return (
    <YStack fullscreen padding="$3">
      <H3>{activity.getPrompt().text}</H3>
      <XStack flexWrap="wrap" marginTop="$6">
        {userAnswer.answer.map((word, index) => (
          <Button key={index} onPress={() => removeWord(index)} theme={'green'}>
            {word}
          </Button>
        ))}
      </XStack>
      <XStack flexWrap="wrap" space="$3" marginTop="$6">
        {wordBank.map((word, index) => (
          <Button key={index} onPress={() => addWord(word)} theme={'green'}>
            {word}
          </Button>
        ))}
      </XStack>
      <Stack flex={1} />
      {!activityRendererMachineService
        .getSnapshot()
        ?.matches('WORKING_STATE.RESULT') && (
        <Button
          disabled={
            !activityRendererMachineService
              .getSnapshot()
              .can({ type: 'finish', userAnswer })
          }
          onPress={onCheckAnswer}>
          Check Answer
        </Button>
      )}
    </YStack>
  );
};
