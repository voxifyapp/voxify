import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from '@packages/activity-builder';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useGetActivityRendererHookExtras } from '@voxify/modules/main/components/ActivityRenderer/common/useGetActivityRendererHookExtras';
import { derivedValues } from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/derivedValues';
import { omit } from 'lodash';

type ContextData = {
  activity: FillInTheBlanksActivity;
};

export function useCreateFillInTheBlanksContext({ activity }: ContextData) {
  const {
    userAnswer,
    setUserAnswer,
    answerErrors,
    setAnswerErrors,
    isWorkingStateAnd,
  } = useGetActivityRendererHookExtras<
    FillInTheBlanksActivityAnswer,
    FillInTheBlanksAnswerErrorsType
  >({});

  const derived = derivedValues({ userAnswer, activity });

  return {
    activity,
    ...derived,
    setUserAnswer,
    userAnswer,
    addWord: (optionId: string) => {
      setUserAnswer(prev => ({ ...prev, [derived.nextUserBlank!]: optionId }));
    },
    removeWord: (blankId: string) => {
      setUserAnswer(prev => omit(prev, blankId));
    },
    setAnswerErrors,
    answerErrors,
    canAddWord: isWorkingStateAnd(!!derived.nextUserBlank),
    canRemoveWord: isWorkingStateAnd(Object.keys(userAnswer).length > 0),
  };
}

export const [
  useFillInTheBlanksContext,
  FillInTheBlanksContextProvider,
  FillInTheBlanksContextConsumer,
] = createCtx<ReturnType<typeof useCreateFillInTheBlanksContext>>();
