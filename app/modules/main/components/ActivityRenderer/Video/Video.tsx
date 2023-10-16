import { VideoActivity } from '@packages/activity-builder';
import { Constants } from '@voxify/appConstants';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import RNVideo from 'react-native-video';
import { Progress, ZStack } from 'tamagui';

type Props = {
  activity: VideoActivity;
};

/**
 * TODO: Allow for play/pause/restart
 * TODO: Create a activity response on completion, handle edge cases
 * TODO: Allow seeking
 */
export const Video = ({ activity }: Props) => {
  const [playbackProgress, setPlaybackProgress] = useState<null | number>(null);

  return (
    <ZStack fullscreen>
      <RNVideo
        resizeMode="cover"
        reportBandwidth={true}
        onProgress={({ currentTime, seekableDuration }) => {
          setPlaybackProgress((currentTime / seekableDuration) * 100);
        }}
        source={{ uri: getVideoUrlFromFileName(activity.getVideoFileName()) }}
        style={styles.videoContainer}
      />
      {playbackProgress !== null && (
        <Progress size="$1" position="absolute" value={playbackProgress}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
      )}
    </ZStack>
  );
};

export const getVideoUrlFromFileName = (fileName: string): string => {
  return `${Constants.ACTIVITY_VIDEO_URL}/${fileName}.mp4`;
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});
