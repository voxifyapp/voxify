import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
} from '@packages/activity-builder';
import { Button } from '@voxify/design_system/button';
import { H1, H3 } from '@voxify/design_system/typography';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { ActivityCardContainer } from '@voxify/modules/main/components/ActivityRenderer/common/ActivityCardContainer';
import { FillInTheBlanksButton } from '@voxify/modules/main/components/ActivityRenderer/common/FillInTheBlanksButton';

import {
  FillInTheBlanksContextProvider,
  useCreateFillInTheBlanksContext,
  useFillInTheBlanksContext,
} from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/fillInTheBlanksContext';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import { each } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { Stack, XStack } from 'tamagui';

type Props = {
  activity: FillInTheBlanksActivity;
};

export const FillInTheBlanks = ({ activity }: Props) => {
  const contextValue = useCreateFillInTheBlanksContext(
    useMemo(() => ({ activity }), [activity]),
  );

  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const {
    options: fillInTheBlankOptions,
    questionSegments,
    userAnswer,
    setUserAnswer,
    userAnswerIndex,
    setUserAnswerIndex,
    setAnswerErrors,
    addWord,
    canAddWord,
  } = contextValue;

  /**
   * We sync restore data here. Useful when the view is being recycled (for eg. in a virtualized list)
   * or we are trying to get data from the database.
   */
  // TODO This is a really ugly and looking for a better solution, but for the POC let's go!
  useEffect(() => {
    const syncUserAnswerIndexWithUserAnswer = (
      userAnswerForSync: FillInTheBlanksActivityAnswer,
    ) => {
      const newUserAnswerIndexForSync: Record<string, number> = {};
      const usedOptionsIndexes = new Set<number>();
      each(userAnswerForSync, (selectedOptionForBlank, blank) => {
        const optionIndexForBlank = fillInTheBlankOptions.findIndex(
          (option, index) =>
            !usedOptionsIndexes.has(index) && option === selectedOptionForBlank,
        );
        newUserAnswerIndexForSync[blank] = optionIndexForBlank;
      });
      setUserAnswerIndex(newUserAnswerIndexForSync);
    };
    return activityRendererMachineService.subscribe(state => {
      if (state.event.type === 'RESTORE_DATA') {
        setUserAnswer(state.context.userAnswer);
        setAnswerErrors(state.context.answerError);
        syncUserAnswerIndexWithUserAnswer(state.context.userAnswer);
      }
    }).unsubscribe;
  }, [
    activityRendererMachineService,
    fillInTheBlankOptions,
    setAnswerErrors,
    setUserAnswer,
    setUserAnswerIndex,
  ]);

  const onCheckAnswerClicked = () => {
    activityRendererMachineService.send({ type: 'finish', userAnswer });
    const answerErrors = activity.checkAnswer(userAnswer);
    setAnswerErrors(answerErrors);
    activityRendererMachineService.send({
      type: 'set_result',
      result:
        answerErrors?.wrongBlanks.length === 0
          ? ActivityResponseResultType.SUCCESS
          : ActivityResponseResultType.FAIL,
      userAnswer,
      answerError: answerErrors,
    });
  };

  return (
    <FillInTheBlanksContextProvider value={contextValue}>
      <ActivityCardContainer alignItems="center">
        <XStack flexWrap="wrap">
          {questionSegments.map((segment, index) => (
            <SegmentRenderer key={index} segment={segment} />
          ))}
        </XStack>
        <XStack flexWrap="wrap" space="$3" mt="$4">
          {fillInTheBlankOptions.map((blankOption, blankOptionIndex) => (
            <FillInTheBlanksButton
              disabled={!canAddWord}
              wordUsed={new Set(Object.values(userAnswerIndex)).has(
                blankOptionIndex,
              )}
              key={blankOptionIndex}
              onPress={() => {
                addWord(blankOption, blankOptionIndex);
              }}>
              {blankOption}
            </FillInTheBlanksButton>
          ))}
        </XStack>
        <Stack flex={1} />
        {activityRendererMachineService
          .getSnapshot()
          ?.can({ type: 'finish', userAnswer }) && (
          <Button fullWidth onPress={onCheckAnswerClicked}>
            Check Answer
          </Button>
        )}
        {activityRendererMachineService
          .getSnapshot()
          ?.matches({ WORKING_STATE: 'RESULT' }) && (
          <>
            {activityRendererMachineService.getSnapshot()?.context.result ===
              ActivityResponseResultType.SUCCESS && <H1>Correct</H1>}
            {activityRendererMachineService.getSnapshot()?.context.result ===
              ActivityResponseResultType.FAIL && <H1>Wrong</H1>}
          </>
        )}
      </ActivityCardContainer>
    </FillInTheBlanksContextProvider>
  );
};

const SegmentRenderer = ({ segment }: { segment: string }) => {
  const { userAnswer, removeWord, canRemoveWord } = useFillInTheBlanksContext();

  if (segment.match(FillInTheBlanksActivity.BLANK_FORMAT)) {
    if (userAnswer[segment]) {
      const answerForBlank = userAnswer[segment];
      return (
        <H3
          textDecorationLine="underline"
          color="$highlightTextColor"
          disabled={!canRemoveWord}
          onPress={() => {
            removeWord(segment);
          }}>
          {answerForBlank}
        </H3>
      );
    }
    return <H3>____</H3>;
  }

  return <H3>{segment} </H3>;
};
