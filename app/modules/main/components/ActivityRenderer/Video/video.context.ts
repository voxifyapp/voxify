import { VideoActivity, VideoActivityAnswer } from '@packages/activity-builder';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { getVideoProgressPercentage } from '@voxify/modules/main/components/ActivityRenderer/Video/Video';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';
import { useState } from 'react';

type ContextData = {
  activity: VideoActivity;
};

export function useCreateVideoContext({ activity }: ContextData) {
  const {
    userAnswer,
    answerErrors,
    setAnswerErrors,
    setUserAnswer,
    isWorkingStateAnd,
    isShowResultState,
    isFocused,
  } = useGetActivityRendererHookExtras<VideoActivityAnswer, null>({
    completionTime: 0,
  });

  const [videoProgress, setVideoProgress] = useState<null | {
    currentPosition: number;
    videoLength?: number;
  }>(null);
  const [videoStatus, setVideoStatus] = useState<
    'playing' | 'paused' | 'finished' | 'buffering' | null
  >(null);
  const [showControls, setShowControls] = useState(false);

  const playbackProgressPercentage = getVideoProgressPercentage(
    videoProgress?.currentPosition,
    videoProgress?.videoLength,
  );

  return {
    isFocused,
    activity,
    userAnswer,
    setAnswerErrors,
    setUserAnswer,
    answerErrors,
    isShowResultState,
    isWorkingState: isWorkingStateAnd(true),
    videoProgress,
    setVideoProgress,
    videoStatus,
    setVideoStatus,
    showControls,
    setShowControls,
    playbackProgressPercentage,
  };
}

export const [] = createCtx<ReturnType<typeof useCreateVideoContext>>();
