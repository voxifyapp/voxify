import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
} from "@packages/activity-builder";
import { SegmentRenderer } from "@voxify/components/ActivityRenderer/FillInTheBlanks/components/SegmentRenderer";
import {
  useCreateFillInTheBlanksContext,
  FillInTheBlanksContextProvider,
} from "@voxify/components/ActivityRenderer/FillInTheBlanks/fillInTheBlanksContext";
import { useActivityRendererContext } from "@voxify/components/ActivityRenderer/activityRenderer.context";
import { ActivityCardContainer } from "@voxify/components/ActivityRenderer/common/ActivityCardContainer";
import { FillInTheBlanksButton } from "@voxify/components/ActivityRenderer/common/FillInTheBlanksButton";
import { ResultView } from "@voxify/components/ActivityRenderer/common/ResultView";
import { Button } from "@voxify/design_system/button";
import { ActivityResponseResultType } from "@voxify/types/lms-progress/activity-response";
import { each } from "lodash";
import React, { useEffect, useMemo } from "react";
import { Stack, XStack } from "tamagui";

type Props = {
  activity: FillInTheBlanksActivity;
};

export const FillInTheBlanks = ({ activity }: Props) => {
  const contextValue = useCreateFillInTheBlanksContext(
    useMemo(() => ({ activity }), [activity])
  );

  const { machineService: activityRendererMachineService, isShowingResults } =
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
      userAnswerForSync: FillInTheBlanksActivityAnswer
    ) => {
      const newUserAnswerIndexForSync: Record<string, number> = {};
      const usedOptionsIndexes = new Set<number>();
      each(userAnswerForSync, (selectedOptionForBlank, blank) => {
        const optionIndexForBlank = fillInTheBlankOptions.findIndex(
          (option, index) =>
            !usedOptionsIndexes.has(index) && option === selectedOptionForBlank
        );
        newUserAnswerIndexForSync[blank] = optionIndexForBlank;
      });
      setUserAnswerIndex(newUserAnswerIndexForSync);
    };
    return activityRendererMachineService.subscribe((state) => {
      if (state.event.type === "RESTORE_DATA") {
        state.event.restoreData;
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
    activityRendererMachineService.send({ type: "finish", userAnswer });
    const answerErrors = activity.checkAnswer(userAnswer);
    setAnswerErrors(answerErrors);
    activityRendererMachineService.send({
      type: "set_result",
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
      <ActivityCardContainer fullscreen={false} flex={1} alignItems="center">
        <XStack space="$1.5" flexWrap="wrap">
          {questionSegments.map((segment, index) => (
            <SegmentRenderer key={index} segment={segment} />
          ))}
        </XStack>
        <XStack flexWrap="wrap" space="$3" mt="$4">
          {fillInTheBlankOptions.map((blankOption, blankOptionIndex) => (
            <FillInTheBlanksButton
              disabled={!canAddWord}
              wordUsed={new Set(Object.values(userAnswerIndex)).has(
                blankOptionIndex
              )}
              key={blankOptionIndex}
              onPress={() => {
                addWord(blankOption, blankOptionIndex);
              }}
            >
              {blankOption}
            </FillInTheBlanksButton>
          ))}
        </XStack>
        <Stack flex={1} />
        {activityRendererMachineService
          .getSnapshot()
          ?.can({ type: "finish", userAnswer }) && (
          <Button fullWidth onPress={onCheckAnswerClicked}>
            Check Answer
          </Button>
        )}
      </ActivityCardContainer>
      {isShowingResults && <ResultView />}
    </FillInTheBlanksContextProvider>
  );
};
