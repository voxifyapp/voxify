import { VideoActivity, VideoActivityAnswer } from "@packages/activity-builder";
import { createCtx } from "@voxify/common/utils/contextUtils";
import { useGetActivityRendererHookExtras } from "@voxify/components/ActivityRenderer/common/useGetActivityRendererHookExtras";
import { getVideoProgressPercentage } from "@voxify/components/ActivityRenderer/Video/Video";
import { useState } from "react";

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
  } = useGetActivityRendererHookExtras<VideoActivityAnswer, null>({
    completionTime: 0,
  });

  const [videoProgress, setVideoProgress] = useState<null | {
    currentPosition: number;
    videoLength?: number;
  }>(null);
  const [videoStatus, setVideoStatus] = useState<
    "playing" | "paused" | "finished" | "buffering" | null
  >(null);
  const [showControls, setShowControls] = useState(false);

  const playbackProgressPercentage = getVideoProgressPercentage(
    videoProgress?.currentPosition,
    videoProgress?.videoLength
  );

  return {
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
