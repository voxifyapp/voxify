import {
  MultipleChoiceActivity,
  MultipleChoiceActivityAnswer,
  MultipleChoiceAnswerErrorsType,
} from '@packages/activity-builder';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';

type ContextData = {
  activity: MultipleChoiceActivity;
};

export function useCreateMultipleChoiceContext({ activity }: ContextData) {
  const {
    userAnswer,
    setUserAnswer,
    answerErrors,
    setAnswerErrors,
    isWorkingStateAnd,
    ...rest
  } = useGetActivityRendererHookExtras<
    MultipleChoiceActivityAnswer,
    MultipleChoiceAnswerErrorsType
  >({ answer: [] });

  return {
    activity,
    userAnswer,
    setAnswerErrors,
    answerErrors,
    isWorkingState: isWorkingStateAnd(true),
    onOptionSelected: (optionId: string) =>
      setUserAnswer(prev => {
        // set answer, if optionId already exists remove it. Or else add it
        if (!activity.getIsMultipleAnswer()) {
          return { answer: [optionId] };
        }
        const newAnswer = [...prev.answer];
        if (newAnswer.includes(optionId)) {
          newAnswer.splice(newAnswer.indexOf(optionId), 1);
        } else {
          newAnswer.push(optionId);
        }
        return {
          answer: newAnswer,
        };
      }),
    ...rest,
  };
}

export const [
  useMultipleChoiceContext,
  MultipleChoiceContextProvider,
  MultipleChoiceContextConsumer,
] = createCtx<ReturnType<typeof useCreateMultipleChoiceContext>>();
