import { FormASentenceActivity } from '@packages/activity-builder';
import { Button } from '@voxify/design_system/button';
import { H4 } from '@voxify/design_system/typography';
import { FormASentenceButton } from '@voxify/modules/main/components/ActivityRenderer/FormASentence/components/FormASentenceButton';
import { useCreateFormASentenceContext } from '@voxify/modules/main/components/ActivityRenderer/FormASentence/formASentence.context';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { ActivityCardContainer } from '@voxify/modules/main/components/ActivityRenderer/common/ActivityCardContainer';
import { ResultView } from '@voxify/modules/main/components/ActivityRenderer/common/ResultView';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import { countBy } from 'lodash';
import React from 'react';
import { SizableText, Stack, XStack, YStack } from 'tamagui';

type Props = {
  activity: FormASentenceActivity;
};

export const FormASentence = ({ activity }: Props) => {
  const { machineService: activityRendererMachineService, isShowingResults } =
    useActivityRendererContext();

  const context = useCreateFormASentenceContext({
    activity,
  });
  const { userAnswer, addWord, removeWord, setAnswerErrors, answerErrors } =
    context;

  const words = activity.getWords();
  const remainingWordsCount = countBy(words);
  userAnswer.answer.forEach(word => {
    remainingWordsCount[word]--;
  });
  const uniqueWords = [...new Set(words)];

  const onCheckAnswerPressed = () => {
    activityRendererMachineService.send({ type: 'finish', userAnswer });
    const _answerErrors = activity.checkAnswer(userAnswer);
    setAnswerErrors(_answerErrors);
    activityRendererMachineService.send({
      type: 'set_result',
      result: _answerErrors?.correct
        ? ActivityResponseResultType.SUCCESS
        : ActivityResponseResultType.FAIL,
      userAnswer,
      answerError: _answerErrors,
    });
  };

  return (
    <YStack fullscreen>
      <ActivityCardContainer flex={1} fullscreen={false}>
        <H4>{activity.getPrompt().text}</H4>
        <XStack
          borderBottomWidth={3}
          borderColor="gray"
          minHeight={40}
          flexWrap="wrap"
          marginTop="$3">
          {userAnswer.answer.map((word, index) => (
            <H4
              color={
                isShowingResults
                  ? answerErrors?.correct
                    ? '$color.green5'
                    : '$color.orange5'
                  : '$color.blue'
              }
              key={index}
              mr={4}
              disabled={isShowingResults}
              onPress={() => {
                removeWord(index);
              }}>
              {word}
            </H4>
          ))}
        </XStack>
        {isShowingResults && !answerErrors?.correct && (
          <SizableText color="$color.green5">
            Answer: {activity.getAnswer().join(' ')}
          </SizableText>
        )}
        <XStack justifyContent="center" flexWrap="wrap" mt="$4">
          {uniqueWords.map((word, index) => {
            const numberOfRemainingWordUses = remainingWordsCount[word];
            return (
              <FormASentenceButton
                marginRight="$2"
                marginBottom="$2"
                key={index}
                disabled={isShowingResults}
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
        <Stack flex={1} />
        {!isShowingResults && (
          <Button onPress={onCheckAnswerPressed} fullWidth>
            Check Answer
          </Button>
        )}
      </ActivityCardContainer>
      {isShowingResults && <ResultView />}
    </YStack>
  );
};
