import { TextActivity } from '@packages/activity-builder';
import { Button } from '@voxify/design_system/button';
import { H2, Paragraph } from '@voxify/design_system/typography';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { ActivityCardContainer } from '@voxify/modules/main/components/ActivityRenderer/common/ActivityCardContainer';

import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import React from 'react';
import { YStack } from 'tamagui';

type Props = {
  activity: TextActivity;
  heading?: string;
};

export const Text = ({ activity }: Props) => {
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  console.log(activity);

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
    <ActivityCardContainer>
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2 textAlign="center">{activity.getTitle().text}</H2>
        <Paragraph mt="$2" textAlign="center">
          {activity.getDescription().text}
        </Paragraph>
      </YStack>
      {activityRendererMachineService
        .getSnapshot()
        ?.can({ type: 'finish', userAnswer: {} }) && (
        <Button onPress={onDoneClicked}>Done</Button>
      )}
    </ActivityCardContainer>
  );
};
