import {
  FillInTheBlanksActivity,
  FillInTheBlanksActivityAnswer,
  FillInTheBlanksAnswerErrorsType,
} from '@voxify/common/activities/fill-in-the-blanks-activity';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
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
  const [answerErrors, setAnswerErrors] =
    useState<FillInTheBlanksAnswerErrorsType | null>(null);

  const derived = derivedValues({ userAnswer, activity });

  const isWorkingStateAnd = (condition: boolean) => {
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
