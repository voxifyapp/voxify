import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';

import {
  FillInTheBlanksContextProvider,
  useCreateFillInTheBlanksContext,
  useFillInTheBlanksContext,
} from '@voxify/modules/main/screens/LessonScreen/components/FillInTheBlanks/fillInTheBlanksContext';
import React from 'react';
import { Button, H1, H3, Stack, XStack, YStack } from 'tamagui';

type Props = {
  activity: FillInTheBlanksActivity;
};

export const FillInTheBlanks = ({ activity }: Props) => {
  const contextValue = useCreateFillInTheBlanksContext({ activity });

  const { options, questionSegments, send, state, EventTypes } = contextValue;

  const { userAnswer } = state.context;

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
                disabled={
                  !state.can({
                    type: EventTypes.ADD_WORD,
                    payload: { optionId: option.id },
                  })
                }
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
        {state.can({ type: EventTypes.CHECK_ANSWER }) && (
          <Button onPress={() => send({ type: EventTypes.CHECK_ANSWER })}>
            Check Answer
          </Button>
        )}
        {state.matches('CORRECT_ANSWER') && <H1>Correct</H1>}
        {state.matches('WRONG_ANSWER') && <H1>Wrong</H1>}
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
          disabled={
            !state.can({
              type: EventTypes.REMOVE_WORD,
              payload: { blankId: segment },
            })
          }
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
