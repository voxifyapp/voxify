import { FillInTheBlanksActivity } from "@packages/activity-builder";
import { useFillInTheBlanksContext } from "@voxify/components/ActivityRenderer/FillInTheBlanks/fillInTheBlanksContext";
import { useActivityRendererContext } from "@voxify/components/ActivityRenderer/activityRenderer.context";
import { H3 } from "@voxify/design_system/typography";

import React from "react";
import { XStack, styled } from "tamagui";

/**
 * Fill in the blanks are rendered as segments. We split each word and blanks into
 * segments. This allows us to easily render the blanks
 */
export const SegmentRenderer = ({ segment }: { segment: string }) => {
  const { userAnswer } = useFillInTheBlanksContext();

  if (segment.match(FillInTheBlanksActivity.BLANK_FORMAT)) {
    if (userAnswer[segment]) {
      return <BlankSegment blankId={segment} />;
    }
    return <H3>____</H3>;
  }

  return <H3>{segment}</H3>;
};

const BlankSegment = ({ blankId }: { blankId: string }) => {
  const { userAnswer, canRemoveWord, removeWord, answerErrors, activity } =
    useFillInTheBlanksContext();
  const { isShowingResults } = useActivityRendererContext();

  const selectedAnswerForBlank = userAnswer[blankId];

  if (isShowingResults) {
    const isBlankCorrectAnswer = !answerErrors?.wrongBlanks.includes(blankId);
    const correctAnswerForBlank = activity.getAnswer()[blankId];
    return (
      <XStack space="$1.5">
        {!isBlankCorrectAnswer && (
          <BlankText
            disabled={!canRemoveWord}
            textDecorationLine="underline line-through"
            result={isBlankCorrectAnswer ? "correct" : "incorrect"}
            onPress={() => {
              removeWord(blankId);
            }}
          >
            {selectedAnswerForBlank}
          </BlankText>
        )}

        <BlankText result="correct">{correctAnswerForBlank}</BlankText>
      </XStack>
    );
  }

  return (
    <BlankText
      disabled={!canRemoveWord}
      onPress={() => {
        removeWord(blankId);
      }}
    >
      {selectedAnswerForBlank}
    </BlankText>
  );
};

const BlankText = styled(H3, {
  name: "BlankText",
  color: "$highlightTextColor",
  textDecorationLine: "underline",
  variants: {
    result: {
      incorrect: {
        color: "$color.orange5",
      },
      correct: {
        color: "$color.green5",
      },
    },
  },
});
