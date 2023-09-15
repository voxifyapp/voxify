import { VideoActivity } from '@voxify/common/activities/video-activity';
import React from 'react';
import RNVideo from 'react-native-video';
import { YStack } from 'tamagui';

type Props = {
  activity: VideoActivity;
};

export const Video = ({ activity }: Props) => {
  return (
    <YStack>
      <RNVideo
        resizeMode="cover"
        paused={true}
        onBandwidthUpdate={data => console.log(data)}
        onBuffer={data => console.log(data)}
        reportBandwidth={true}
        onPlaybackStalled={() => console.log('Stalled')}
        source={{ uri: activity.getVideoUrl() }}
        style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
      />
    </YStack>
  );
};
