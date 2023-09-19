import { VideoActivity } from '@packages/activity-builder';
import { Constants } from '@voxify/appConstants';
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
        source={{ uri: getVideoUrlFromFileName(activity.getVideoFileName()) }}
        style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
      />
    </YStack>
  );
};

export const getVideoUrlFromFileName = (fileName: string): string => {
  return `${Constants.ACTIVITY_VIDEO_URL}/${fileName}.mp4`;
};
