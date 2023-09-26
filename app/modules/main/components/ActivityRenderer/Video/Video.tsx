import {
  VideoActivity,
  VideoActivityAnswer,
  VideoActivityAnswerErrorsType,
} from '@packages/activity-builder';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import React from 'react';
import RNVideo from 'react-native-video';
import { Stack, YStack } from 'tamagui';

type Props = {
  activity: VideoActivity;
};

export const Video = ({ activity }: Props) => {
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const { isWorkingStateAnd } = useGetActivityRendererHookExtras<
    VideoActivityAnswer,
    VideoActivityAnswerErrorsType
  >({});

  const shouldPlayVideo = isWorkingStateAnd(true);

  const onCheckAnswer = (userAnswer: VideoActivityAnswer) => {
    activityRendererMachineService.send({ type: 'finish', userAnswer });
    const answerErrors = activity.checkAnswer();
    activityRendererMachineService.send({
      type: 'set_result',
      result: ActivityResponseResultType.SUCCESS,
      answerError: answerErrors,
      userAnswer,
    });
  };

  return (
    <YStack>
      {shouldPlayVideo ? (
        <RNVideo
          resizeMode="cover"
          reportBandwidth={true}
          onEnd={() => {
            onCheckAnswer({ completionPercent: 100 });
          }}
          controls={true}
          source={{
            uri: activity.getVideoUrl(),
          }}
          style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
        />
      ) : (
        <Stack width="100%" height="100%" backgroundColor="red" />
      )}
    </YStack>
  );
};
