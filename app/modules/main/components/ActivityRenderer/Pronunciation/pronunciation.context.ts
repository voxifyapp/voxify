import {} from '@voxify/common/activities/form-a-sentence-activity';
import {
  PronunciationActivity,
  PronunciationActivityAnswer,
  PronunciationAnswerErrorType,
} from '@voxify/common/activities/pronunciation-activity';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';
type ContextData = {
  activity: PronunciationActivity;
};

export function useCreatePronunciationContext({ activity }: ContextData) {
  const {
    userAnswer,
    answerErrors,
    setAnswerErrors,
    setUserAnswer,
    isWorkingStateAnd,
    isShowResultState,
  } = useGetActivityRendererHookExtras<
    PronunciationActivityAnswer,
    PronunciationAnswerErrorType
  >({ recognizedWords: '' });

  return {
    activity,
    userAnswer,
    setAnswerErrors,
    setUserAnswer,
    answerErrors,
    isWorkingState: isWorkingStateAnd(true),
  };
}

export const [
  usePronunciationContext,
  PronunciationContextProvider,
  PronunciationContextConsumer,
] = createCtx<ReturnType<typeof useCreatePronunciationContext>>();
