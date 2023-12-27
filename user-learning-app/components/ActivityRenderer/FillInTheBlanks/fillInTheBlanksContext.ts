import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from "@packages/activity-builder";
import { createCtx } from "@voxify/common/utils/contextUtils";
import { useGetActivityRendererHookExtras } from "@voxify/components/ActivityRenderer/common/useGetActivityRendererHookExtras";
import { derivedValues } from "@voxify/components/ActivityRenderer/FillInTheBlanks/derivedValues";
import { omit } from "lodash";
import { useState } from "react";

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

  const [userAnswerIndex, setUserAnswerIndex] = useState<
    Record<string, number>
  >({});

  const derived = derivedValues({ userAnswer, activity });

  return {
    activity,
    ...derived,
    setUserAnswer,
    userAnswer,
    setUserAnswerIndex,
    /** In order to support multiple same words in the example, we need to map the answers to the index
  This will not be stored in the database and needs to be resynced */
    userAnswerIndex,
    addWord: (optionId: string, index: number) => {
      setUserAnswer((prev) => ({
        ...prev,
        [derived.nextUserBlank!]: optionId,
      }));
      setUserAnswerIndex((prev) => ({
        ...prev,
        [derived.nextUserBlank!]: index,
      }));
    },
    removeWord: (blankId: string) => {
      setUserAnswer((prev) => omit(prev, blankId));
      setUserAnswerIndex((prev) => omit(prev, blankId));
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
