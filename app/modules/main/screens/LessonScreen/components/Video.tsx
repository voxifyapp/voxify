import { VideoActivity } from '@voxify/common/activities/video-activity';
import React from 'react';
import { H1, YStack } from 'tamagui';

type Props = {
  activity: VideoActivity;
};

export const Video = ({ activity }: Props) => {
  return (
    <YStack>
      <H1>{activity.getVideoUrl()}</H1>
    </YStack>
  );
};
