import { VideoActivity } from '@voxify/common/activities/video-activity';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';
import React from 'react';
import RNVideo from 'react-native-video';
import { Stack, YStack } from 'tamagui';

type Props = {
  activity: VideoActivity;
};

export const Video = ({ activity }: Props) => {
  const { isWorkingStateAnd } = useGetActivityRendererHookExtras({ activity });

  const shouldPlayVideo = isWorkingStateAnd(true);

  console.log(shouldPlayVideo);

  console.log('render video');

  return (
    <YStack>
      {shouldPlayVideo ? (
        <RNVideo
          resizeMode="cover"
          onLoadStart={() => console.log('onLoadStart')}
          onLoad={data => console.log('onLoad', data)}
          onBandwidthUpdate={data => console.log(data)}
          onBuffer={data => console.log(data)}
          reportBandwidth={true}
          onPlaybackStalled={() => console.log('Stalled')}
          source={{
            uri: 'https://pub-a7f2b1be55e640dbbdb1294dd2b6e300.r2.dev/My Movie.mp4',
          }}
          style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
        />
      ) : (
        <Stack width="100%" height="100%" backgroundColor="red" />
      )}
    </YStack>
  );
};
