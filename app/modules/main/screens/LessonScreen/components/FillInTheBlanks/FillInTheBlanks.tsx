import {
  FillInTheBlanksActivity,
  FillInTheBlanksAnswerErrorsType,
} from '@voxify/common/activities/fill-in-the-blanks-activity';

import {
  FillInTheBlanksContextProvider,
  useCreateFillInTheBlanksContext,
  useFillInTheBlanksContext,
} from '@voxify/modules/main/screens/LessonScreen/components/FillInTheBlanks/fillInTheBlanksContext';
import React, { useEffect, useState } from 'react';
import { Button, H3, Stack, XStack, YStack } from 'tamagui';

type Props = {
  activity: FillInTheBlanksActivity;
};

export const FillInTheBlanks = ({ activity }: Props) => {
  const contextValue = useCreateFillInTheBlanksContext({ activity });

  const { options, questionSegments, nextUserBlank, send, state, EventTypes } =
    contextValue;

  useEffect(() => {
    send({ type: EventTypes.FOCUS });
  }, [EventTypes.FOCUS, send]);

  const { userAnswer } = state.context;

  console.log(state);

  // Stores if there are any answer errors, null if answer is not yet checked
  const [answerErrors, setAnswerErrors] =
    useState<FillInTheBlanksAnswerErrorsType | null>(null);
  return (
    <FillInTheBlanksContextProvider value={contextValue}>
      <YStack padding="$3" fullscreen>
        <XStack flexWrap="wrap">
          {questionSegments.map((segment, index) => (
            <SegmentRenderer key={index} segment={segment} />
          ))}
        </XStack>
        <XStack flexWrap="wrap" space="$3">
          {options
            .filter(
              option => !new Set(Object.values(userAnswer)).has(option.id),
            )
            .map(option => (
              <Button
                disabled={!nextUserBlank}
                key={option.id}
                onPress={() => {
                  send({
                    type: EventTypes.ADD_WORD,
                    payload: { optionId: option.id },
                  });
                }}
                theme={'green'}>
                {option.text}
              </Button>
            ))}
        </XStack>
        <Stack flex={1} />
        {answerErrors === null ? (
          <Button
            onPress={() => setAnswerErrors(activity.checkAnswer(userAnswer))}>
            Check Answer
          </Button>
        ) : (
          <H3>{answerErrors.wrongBlanks.length === 0 ? 'Correct' : 'Error'}</H3>
        )}
      </YStack>
    </FillInTheBlanksContextProvider>
  );
};

const SegmentRenderer = ({ segment }: { segment: string }) => {
  const { state, send, EventTypes } = useFillInTheBlanksContext();

  const { userAnswer, activity } = state.context;

  if (segment.match(FillInTheBlanksActivity.BLANK_FORMAT)) {
    if (userAnswer[segment]) {
      const optionIdForBlank = userAnswer[segment];
      const answerForBlank = activity
        .getOptions()
        .find(option => option.id === optionIdForBlank)?.text;
      return (
        <Button
          onPress={() => {
            send({
              type: EventTypes.REMOVE_WORD,
              payload: { blankId: segment },
            });
          }}
          theme="green">
          {answerForBlank}
        </Button>
      );
    }
    return <H3>____</H3>;
  }

  return <H3>{segment} </H3>;
};
