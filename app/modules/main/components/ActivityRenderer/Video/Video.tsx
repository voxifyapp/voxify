import { VideoActivity } from '@packages/activity-builder';
import { PauseCircle, PlayCircle, RotateCcw } from '@tamagui/lucide-icons';
import { Constants } from '@voxify/appConstants';
import { YStack } from '@voxify/design_system/layout';
import { useCreateVideoContext } from '@voxify/modules/main/components/ActivityRenderer/Video/video.context';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import RNVideo, { OnProgressData } from 'react-native-video';
import { ButtonIcon, Progress, ZStack } from 'tamagui';

type Props = {
  activity: VideoActivity;
};

/**
 * TODO: Allow for play/pause/restart
 * TODO: Create a activity response on completion, handle edge cases
 * TODO: Optimize scrolling
 * TODO: Allow seeking
 * A good place to implement XState
 */
export const Video = ({ activity }: Props) => {
  const videoRef = useRef<RNVideo>(null);
  const [showControls, setShowControls] = useState(false);

  const [state, dispatch] = useReducer(videoReducer, {
    videoStatus: 'paused',
  } as State);

  const playbackProgressPercentage = state.videoProgress
    ? (state.videoProgress.currentTime / state.videoProgress.seekableDuration) *
      100
    : null;
  const { isWorkingState } = useCreateVideoContext({ activity });

  useEffect(() => {
    dispatch({
      type: isWorkingState ? ActionTypes.PLAY_VIDEO : ActionTypes.PAUSE_VIDEO,
    });
  }, [isWorkingState]);

  const isVideoComplete = (playbackProgressPercentage || 0) > 99.5;
  useEffect(() => {
    if (isVideoComplete) {
      dispatch({ type: ActionTypes.PAUSE_VIDEO });
    }
  }, [isVideoComplete]);

  return (
    <ZStack fullscreen>
      {isWorkingState ? (
        <YStack fullscreen onPress={() => setShowControls(true)}>
          <RNVideo
            ref={videoRef}
            resizeMode="cover"
            reportBandwidth={true}
            repeat={false}
            paused={state.videoStatus === 'paused'}
            onProgress={_videoProgress => {
              dispatch({
                type: ActionTypes.UPDATE_PROGRESS,
                progress: _videoProgress,
              });
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
                  dispatch({ type: ActionTypes.RESTART_VIDEO });
                  videoRef.current?.seek(0);
                }}>
                <ButtonIcon scaleIcon={6}>
                  <RotateCcw color="$inverseTextColor" />
                </ButtonIcon>
              </Pressable>
            ) : (
              <Pressable
                onPress={() =>
                  dispatch({
                    type:
                      state.videoStatus === 'paused'
                        ? ActionTypes.PLAY_VIDEO
                        : ActionTypes.PAUSE_VIDEO,
                  })
                }>
                <ButtonIcon scaleIcon={6}>
                  {state.videoStatus === 'paused' ? (
                    <PlayCircle color="$inverseTextColor" />
                  ) : (
                    <PauseCircle color="$inverseTextColor" />
                  )}
                </ButtonIcon>
              </Pressable>
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

type State = {
  videoStatus: 'playing' | 'paused';
  videoProgress: OnProgressData | null;
};

enum ActionTypes {
  PLAY_VIDEO,
  PAUSE_VIDEO,
  UPDATE_PROGRESS,
  RESTART_VIDEO,
}

type Actions =
  | {
      type:
        | ActionTypes.PLAY_VIDEO
        | ActionTypes.PAUSE_VIDEO
        | ActionTypes.RESTART_VIDEO;
    }
  | { type: ActionTypes.UPDATE_PROGRESS; progress: OnProgressData };

const videoReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.PLAY_VIDEO:
      return { ...state, videoStatus: 'playing' };
    case ActionTypes.PAUSE_VIDEO:
      return { ...state, videoStatus: 'paused' };
    case ActionTypes.RESTART_VIDEO:
      return { ...state, videoStatus: 'playing', videoProgress: null };
    case ActionTypes.UPDATE_PROGRESS:
      return { ...state, videoProgress: action.progress };
  }

  return state;
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
