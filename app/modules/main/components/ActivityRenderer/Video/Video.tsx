import { VideoActivity, VideoActivityAnswer } from '@packages/activity-builder';
import {
  FastForward,
  PauseCircle,
  PlayCircle,
  Rewind,
  RotateCcw,
  SkipForward,
} from '@tamagui/lucide-icons';
import { Constants } from '@voxify/appConstants';
import { Button } from '@voxify/design_system/button';
import { YStack } from '@voxify/design_system/layout';
import { useCreateVideoContext } from '@voxify/modules/main/components/ActivityRenderer/Video/video.context';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { completedActivitiesAtom } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import { Video as ExpoVideo, ResizeMode } from 'expo-av';
import { useAtomValue } from 'jotai';
import React, { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ButtonIcon, Progress, XStack, ZStack } from 'tamagui';

type Props = {
  activity: VideoActivity;
};

const SKIP_IN_MILLIS = 10 * 1000;

export const Video = ({ activity }: Props) => {
  const completedActivities = useAtomValue(completedActivitiesAtom);

  const videoRef = useRef<ExpoVideo>(null);
  const { machineService: activityRendererMachineService, activityEntity } =
    useActivityRendererContext();

  const isVideoActivityCompleted = completedActivities[activityEntity.id];

  const {
    playbackProgressPercentage,
    setShowControls,
    showControls,
    setVideoProgress,
    videoStatus,
    isFocused,
    setVideoStatus,
    videoProgress,
  } = useCreateVideoContext({ activity });

  useEffect(() => {
    isFocused ? videoRef.current?.playAsync() : videoRef.current?.pauseAsync();
  }, [isFocused]);

  // If video is complete, we show the controls so that the user can replay
  const isVideoComplete = (playbackProgressPercentage || 0) > 99.5;
  useEffect(() => {
    if (isVideoComplete) {
      setShowControls(true);
    }
  }, [activityRendererMachineService, isVideoComplete, setShowControls]);

  const markAsFinished = useCallback(async () => {
    const _videoStatus = await videoRef.current?.getStatusAsync();
    const progress = _videoStatus?.isLoaded
      ? getVideoProgressPercentage(
          _videoStatus.positionMillis,
          _videoStatus.durationMillis,
        )
      : null;

    activityRendererMachineService.send({
      type: 'finish',
      userAnswer: {
        completionTime: progress,
      } as VideoActivityAnswer,
    });

    activityRendererMachineService.send({
      type: 'set_result',
      result: ActivityResponseResultType.SUCCESS,
      userAnswer: {
        completionTime: progress,
      } as VideoActivityAnswer,
      answerError: null,
    });
  }, [activityRendererMachineService]);

  // // The user is not required to see the entire video. If they scroll away, we need to mark the activity as complete
  // We will create a activity response if a user skips the video
  useEffect(() => {
    return activityRendererMachineService.subscribe(state => {
      if (
        state.matches('FOCUSED_STATE.UNFOCUSED') &&
        state.changed &&
        !isVideoActivityCompleted
      ) {
        markAsFinished();
      }
    }).unsubscribe;
  }, [
    activityRendererMachineService,
    isVideoActivityCompleted,
    markAsFinished,
  ]);

  return (
    <ZStack backgroundColor="black" fullscreen>
      {isFocused ? (
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

                if (playbackStatus.didJustFinish) {
                  markAsFinished();
                }

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

      <YStack
        fullscreen
        width="100%"
        p="$2"
        flexDirection="column-reverse"
        alignItems="flex-end">
        {!isVideoActivityCompleted && (
          <Button onPress={markAsFinished} size="$3">
            Skip {<SkipForward size="$1" />}
          </Button>
        )}
      </YStack>

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
                  <ButtonIcon scaleIcon={3}>
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
                          videoProgress?.videoLength || 0,
                        ),
                      });
                    }}>
                    <ButtonIcon scaleIcon={3}>
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

export const getVideoProgressPercentage = (
  currentPosition?: number,
  videoLength?: number,
) => {
  if (currentPosition === undefined || videoLength === undefined) {
    return null;
  } // Video length may be undefined
  return (currentPosition / videoLength) * 100;
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
