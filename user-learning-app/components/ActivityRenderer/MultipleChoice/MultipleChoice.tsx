import { MultipleChoiceActivity } from "@packages/activity-builder";
import { TextBlock } from "@packages/activity-builder/dist/blocks/text-block";
import { ChoiceButton } from "@voxify/components/ActivityRenderer/MultipleChoice/components/ChoiceButton";
import {
  useCreateMultipleChoiceContext,
  MultipleChoiceContextProvider,
} from "@voxify/components/ActivityRenderer/MultipleChoice/multipleChoice.context";
import { useActivityRendererContext } from "@voxify/components/ActivityRenderer/activityRenderer.context";
import { ActivityCardContainer } from "@voxify/components/ActivityRenderer/common/ActivityCardContainer";
import { ResultView } from "@voxify/components/ActivityRenderer/common/ResultView";
import { Button } from "@voxify/design_system/button";
import { H3, Subtext } from "@voxify/design_system/typography";
import { ActivityResponseResultType } from "@voxify/types/lms-progress/activity-response";
import React from "react";
import { Stack, XStack, YStack } from "tamagui";

type Props = {
  activity: MultipleChoiceActivity;
};

export const MultipleChoice = ({ activity }: Props) => {
  const { machineService: activityRendererMachineService, isShowingResults } =
    useActivityRendererContext();

  const context = useCreateMultipleChoiceContext({
    activity,
  });

  const { userAnswer, onOptionSelected, setAnswerErrors } = context;

  const activityAnswers = activity.getAnswer();

  const onChoicePressed = (choice: TextBlock) => {
    onOptionSelected(choice.id);
  };

  const onCheckAnswerPressed = () => {
    activityRendererMachineService.send({ type: "finish", userAnswer });
    const _answerErrors = activity.checkAnswer(userAnswer);
    setAnswerErrors(_answerErrors);
    activityRendererMachineService.send({
      type: "set_result",
      result:
        _answerErrors?.wrongOptions.length === 0
          ? ActivityResponseResultType.SUCCESS
          : ActivityResponseResultType.FAIL,
      userAnswer,
      answerError: _answerErrors,
    });
  };

  return (
    <MultipleChoiceContextProvider value={context}>
      <YStack fullscreen>
        <ActivityCardContainer fullscreen={false} flex={1}>
          <H3>{activity.getQuestion().text}</H3>
          {activity.getIsMultipleAnswer() && (
            <Subtext color="$color.gray5">
              Multiple choice - select 1 or more
            </Subtext>
          )}
          <XStack
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            marginTop="$4"
          >
            {activity.getOptions().map((choice) => {
              const isOptionChecked = !!userAnswer.answer.includes(choice.id);
              const isCorrectAnswer = !!activityAnswers.includes(choice.id);

              return (
                <ChoiceButton
                  key={choice.id}
                  marginRight="$2"
                  marginBottom="$2"
                  disabled={isShowingResults}
                  checked={isOptionChecked}
                  result={
                    isShowingResults
                      ? isCorrectAnswer
                        ? "correct"
                        : isOptionChecked
                        ? "incorrect"
                        : undefined
                      : undefined
                  }
                  onPress={() => onChoicePressed(choice)}
                >
                  {choice.text}
                </ChoiceButton>
              );
            })}
          </XStack>
          <Stack flex={1} />
          {!isShowingResults && (
            <Button fullWidth onPress={onCheckAnswerPressed}>
              Check Answer
            </Button>
          )}
        </ActivityCardContainer>
        {isShowingResults && <ResultView />}
      </YStack>
    </MultipleChoiceContextProvider>
  );
};
