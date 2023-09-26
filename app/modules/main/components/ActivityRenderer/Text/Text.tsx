import { TextActivity } from '@packages/activity-builder';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';

import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import React from 'react';
import { Button, Card, H1, H3, H5, Stack, YStack } from 'tamagui';

type Props = {
  activity: TextActivity;
  heading?: string;
};

export const Text = ({ activity, heading }: Props) => {
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const onDoneClicked = () => {
    activityRendererMachineService.send({ type: 'finish', userAnswer: {} });
    const answerErrors = activity.checkAnswer();
    activityRendererMachineService.send({
      type: 'set_result',
      result: ActivityResponseResultType.SUCCESS,
      userAnswer: {},
      answerError: answerErrors,
    });
  };

  return (
    <YStack padding="$3" fullscreen>
      <H1>
        {activityRendererMachineService.getSnapshot()!.context
          .totalTimeSpentInMillis / 1000}
      </H1>
      <H5>
        {JSON.stringify(activityRendererMachineService.getSnapshot().value)}
      </H5>
      <H3>{heading}</H3>
      <Card size="$5" width={250} height={300}>
        <Card.Header padded>
          <H3>{activity.getTitle()}</H3>
          <H5>{activity.getDescription()}</H5>
        </Card.Header>
      </Card>
      <Stack flex={1} />
      {activityRendererMachineService
        .getSnapshot()
        ?.can({ type: 'finish', userAnswer: {} }) && (
        <Button onPress={onDoneClicked}>Check Answer</Button>
      )}
    </YStack>
  );
};
