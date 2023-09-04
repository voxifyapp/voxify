import {
  FillInTheBlanksActivity,
  FillInTheBlanksAnswerErrorsType,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';

import {
  FillInTheBlanksContextProvider,
  useCreateFillInTheBlanksContext,
  useFillInTheBlanksContext,
} from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/fillInTheBlanksContext';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import React, { useMemo, useState } from 'react';
import { Button, H1, H3, H5, Stack, XStack, YStack } from 'tamagui';

type Props = {
  activity: FillInTheBlanksActivity;
};

export const FillInTheBlanks = ({ activity }: Props) => {
  const contextValue = useCreateFillInTheBlanksContext(
    useMemo(() => ({ activity }), [activity]),
  );

  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const { options, questionSegments, send, state } = contextValue;
  const { userAnswer } = state.context;

  const [_, setAnswerErrors] = useState<FillInTheBlanksAnswerErrorsType | null>(
    null,
  );

  //TODO Right now, hydration of states does not set the userAnswer and answerErrors properly. Fix.
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
      <YStack padding="$3" fullscreen>
        <H1>
          {activityRendererMachineService.getSnapshot()!.context
            .totalTimeSpentInMillis / 1000}
        </H1>
        <H5>
          {JSON.stringify(activityRendererMachineService.getSnapshot().value)}
        </H5>
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
                  }) ||
                  !activityRendererMachineService
                    .getSnapshot()
                    .matches('WORKING_STATE.WORKING')
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
        {activityRendererMachineService
          .getSnapshot()
          ?.can({ type: 'finish', userAnswer }) && (
          <Button onPress={onCheckAnswerClicked}>Check Answer</Button>
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
