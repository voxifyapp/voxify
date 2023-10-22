import { VideoActivity } from '@packages/activity-builder';
import {
  FastForward,
  PauseCircle,
  PlayCircle,
  Rewind,
  RotateCcw,
} from '@tamagui/lucide-icons';
import { Constants } from '@voxify/appConstants';
import { YStack } from '@voxify/design_system/layout';
import { useCreateVideoContext } from '@voxify/modules/main/components/ActivityRenderer/Video/video.context';
import { Video as ExpoVideo, ResizeMode } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ButtonIcon, Progress, XStack, ZStack } from 'tamagui';

type Props = {
  activity: VideoActivity;
};

const SKIP_IN_MILLIS = 10 * 1000;
/**
 * TODO: Create a activity response on completion, handle edge cases
 * TODO: Optimize scrolling
 * A good place to implement XState
 */
export const Video = ({ activity }: Props) => {
  const videoRef = useRef<ExpoVideo>(null);
  const [videoProgress, setVideoProgress] = useState<null | {
    currentPosition: number;
    videoLength: number;
  }>(null);
  const [videoStatus, setVideoStatus] = useState<
    'playing' | 'paused' | 'finished' | 'buffering' | null
  >(null);
  const [showControls, setShowControls] = useState(false);

  const playbackProgressPercentage = videoProgress
    ? (videoProgress.currentPosition / videoProgress.videoLength) * 100
    : null;
  const { isWorkingState } = useCreateVideoContext({ activity });

  useEffect(() => {
    isWorkingState
      ? videoRef.current?.playAsync()
      : videoRef.current?.pauseAsync();
  }, [isWorkingState]);

  const isVideoComplete = (playbackProgressPercentage || 0) > 99.5;
  useEffect(() => {
    if (isVideoComplete) {
      setShowControls(true);
    }
  }, [isVideoComplete]);

  return (
    <ZStack fullscreen>
      {isWorkingState ? (
        <YStack fullscreen onPress={() => setShowControls(true)}>
          <ExpoVideo
            ref={videoRef}
            resizeMode={ResizeMode.COVER}
            progressUpdateIntervalMillis={500}
            onPlaybackStatusUpdate={playbackStatus => {
              if (playbackStatus.isLoaded) {
                setVideoProgress({
                  currentPosition: playbackStatus.positionMillis,
                  // TODO: Need to check when this is undefined
                  videoLength: playbackStatus.durationMillis!,
                });
                if (playbackStatus.isBuffering) {
                  return setVideoStatus('buffering');
                }

                if (playbackStatus.isPlaying) {
                  return setVideoStatus('playing');
                } else {
                  return setVideoStatus('paused');
                }
              }
            }}
            source={{
              uri: getVideoUrlFromFileName(activity.getVideoFileName()),
            }}
            style={styles.videoContainer}
          />
        </YStack>
      ) : (
        <>{/* TODO Show the video thumbnail */}</>
      )}

      {showControls && (
        <ZStack fullscreen width="100%">
          <YStack
            fullscreen
            backgroundColor="black"
            opacity={0.5}
            onPress={() => setShowControls(false)}
          />
          <YStack fullscreen alignItems="center" justifyContent="center">
            {isVideoComplete ? (
              <Pressable
                onPress={() => {
                  setShowControls(false);
                  videoRef.current?.replayAsync();
                }}>
                <ButtonIcon scaleIcon={6}>
                  <RotateCcw color="$inverseTextColor" />
                </ButtonIcon>
              </Pressable>
            ) : (
              <XStack
                width="100%"
                justifyContent="space-evenly"
                alignItems="center">
                <Pressable
                  onPress={() => {
                    videoRef.current?.setStatusAsync({
                      positionMillis: Math.max(
                        (videoProgress?.currentPosition || 0) - SKIP_IN_MILLIS,
                        0,
                      ),
                    });
                  }}>
                  <ButtonIcon scaleIcon={4}>
                    <Rewind color="$inverseTextColor" />
                  </ButtonIcon>
                </Pressable>
                <Pressable
                  onPress={() => {
                    videoStatus === 'playing'
                      ? videoRef.current?.pauseAsync()
                      : videoRef.current?.playAsync();
                  }}>
                  <ButtonIcon scaleIcon={6}>
                    {videoStatus === 'paused' ? (
                      <PlayCircle color="$inverseTextColor" />
                    ) : (
                      <PauseCircle color="$inverseTextColor" />
                    )}
                  </ButtonIcon>
                </Pressable>
                {videoProgress?.videoLength && (
                  <Pressable
                    onPress={() => {
                      videoRef.current?.setStatusAsync({
                        positionMillis: Math.min(
                          (videoProgress?.currentPosition || 0) +
                            SKIP_IN_MILLIS,
                          videoProgress?.videoLength,
                        ),
                      });
                    }}>
                    <ButtonIcon scaleIcon={4}>
                      <FastForward color="$inverseTextColor" />
                    </ButtonIcon>
                  </Pressable>
                )}
              </XStack>
            )}
          </YStack>
        </ZStack>
      )}

      {playbackProgressPercentage !== null && (
        <Progress
          size="$1"
          position="absolute"
          value={playbackProgressPercentage}>
          <Progress.Indicator backgroundColor="$blue" animation="bouncy" />
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
