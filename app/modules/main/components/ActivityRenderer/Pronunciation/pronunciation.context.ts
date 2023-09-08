import {} from '@voxify/common/activities/form-a-sentence-activity';
import {
  PronunciationActivity,
  PronunciationActivityAnswer,
  PronunciationAnswerErrorType,
} from '@voxify/common/activities/pronunciation-activity';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { pronunciationMachine } from '@voxify/modules/main/components/ActivityRenderer/Pronunciation/pronunciation.machine';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';
import { useMachine } from '@xstate/react';
type ContextData = {
  activity: PronunciationActivity;
};

export function useCreatePronunciationContext({ activity }: ContextData) {
  const [_, __, pronunciationMachineActor] = useMachine(pronunciationMachine);

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
  >({ recognizedWords: '' }, {});

  return {
    activity,
    userAnswer,
    setAnswerErrors,
    setUserAnswer,
    answerErrors,
    pronunciationMachineActor,
    isShowResultState,
    isWorkingState: isWorkingStateAnd(true),
  };
}

export const [
  usePronunciationContext,
  PronunciationContextProvider,
  PronunciationContextConsumer,
] = createCtx<ReturnType<typeof useCreatePronunciationContext>>();
