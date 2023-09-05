import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { useState } from 'react';

/**
 * Common data that will be used across all activities
 */
export const useGetActivityRendererHookExtras = <
  ActivityAnswerType,
  ActivityAnswerErrorType,
>(
  initalAnswer: ActivityAnswerType,
) => {
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const [userAnswer, setUserAnswer] =
    useState<ActivityAnswerType>(initalAnswer);
  const [answerErrors, setAnswerErrors] =
    useState<ActivityAnswerErrorType | null>(null);

  const isWorkingStateAnd = (condition: boolean) => {
    return (
      condition &&
      activityRendererMachineService
        .getSnapshot()
        .matches('WORKING_STATE.WORKING')
    );
  };

  return {
    activityRendererMachineService,
    userAnswer,
    setUserAnswer,
    answerErrors,
    setAnswerErrors,
    isWorkingStateAnd,
  };
};
