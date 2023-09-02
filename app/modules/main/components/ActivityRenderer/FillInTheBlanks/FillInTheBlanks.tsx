import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';
import { ActivityRendererMachineContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRenderer';

import {
  FillInTheBlanksContextProvider,
  useCreateFillInTheBlanksContext,
  useFillInTheBlanksContext,
} from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/fillInTheBlanksContext';
import React, { useMemo } from 'react';
import { Button, H1, H3, Stack, XStack, YStack } from 'tamagui';

type Props = {
  activity: FillInTheBlanksActivity;
};

export const FillInTheBlanks = ({ activity }: Props) => {
  const contextValue = useCreateFillInTheBlanksContext(
    useMemo(() => ({ activity }), [activity]),
  );

  const activityRendererActor = ActivityRendererMachineContext.useActorRef();

  const { options, questionSegments, send, state } = contextValue;
  const { userAnswer } = state.context;

  return (
    <FillInTheBlanksContextProvider value={contextValue}>
      <H1>
        {activityRendererActor.getSnapshot()!.context.totalTimeSpentInMillis /
          1000}
      </H1>
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
                    type: 'add_word',
                    payload: { optionId: option.id },
                  })
                }
                key={option.id}
                onPress={() => {
                  send({
                    type: 'add_word',
                    payload: { optionId: option.id },
                  });
                }}
                theme={'green'}>
                {option.text}
              </Button>
            ))}
        </XStack>
        <Stack flex={1} />
        {activityRendererActor.getSnapshot()?.can({ type: 'FINISH' }) && (
          <Button
            onPress={() => activityRendererActor.send({ type: 'SET_RESULT' })}>
            Check Answer
          </Button>
        )}
        {/* {state.matches('RESULTS.CORRECT_ANSWER') && <H1>Correct</H1>}
        {state.matches('RESULTS.WRONG_ANSWER') && <H1>Wrong</H1>} */}
      </YStack>
    </FillInTheBlanksContextProvider>
  );
};

const SegmentRenderer = ({ segment }: { segment: string }) => {
  const { state, send } = useFillInTheBlanksContext();

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
              type: 'remove_word',
              payload: { blankId: segment },
            })
          }
          onPress={() => {
            send({
              type: 'remove_word',
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
