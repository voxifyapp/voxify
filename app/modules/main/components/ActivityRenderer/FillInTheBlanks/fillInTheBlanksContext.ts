import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from '@packages/activity-builder';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { derivedValues } from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/derivedValues';
import { omit } from 'lodash';
import { useState } from 'react';

type ContextData = {
  activity: FillInTheBlanksActivity;
};

export function useCreateFillInTheBlanksContext({ activity }: ContextData) {
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const [userAnswer, setUserAnswer] = useState<FillInTheBlanksActivityAnswer>(
    {},
  );

  const [userAnswerIndex, setUserAnswerIndex] = useState<
    Record<string, number>
  >({});

  const [answerErrors, setAnswerErrors] =
    useState<FillInTheBlanksAnswerErrorsType | null>(null);

  const derived = derivedValues({ userAnswer, activity });

  const isWorkingState = (condition: boolean) => {
    return (
      condition &&
      activityRendererMachineService
        .getSnapshot()
        .matches('WORKING_STATE.WORKING')
    );
  };

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
      setUserAnswer(prev => ({ ...prev, [derived.nextUserBlank!]: optionId }));
      setUserAnswerIndex(prev => ({
        ...prev,
        [derived.nextUserBlank!]: index,
      }));
    },
    removeWord: (blankId: string) => {
      setUserAnswer(prev => omit(prev, blankId));
      setUserAnswerIndex(prev => omit(prev, blankId));
    },
    setAnswerErrors,
    answerErrors,
    canAddWord: isWorkingState(!!derived.nextUserBlank),
    canRemoveWord: isWorkingState(Object.keys(userAnswer).length > 0),
  };
}

export const [
  useFillInTheBlanksContext,
  FillInTheBlanksContextProvider,
  FillInTheBlanksContextConsumer,
] = createCtx<ReturnType<typeof useCreateFillInTheBlanksContext>>();
