import { VideoActivity, VideoActivityAnswer } from '@packages/activity-builder';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';

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

  return {
    activity,
    userAnswer,
    setAnswerErrors,
    setUserAnswer,
    answerErrors,
    isShowResultState,
    isWorkingState: isWorkingStateAnd(true),
  };
}

export const [] = createCtx<ReturnType<typeof useCreateVideoContext>>();
