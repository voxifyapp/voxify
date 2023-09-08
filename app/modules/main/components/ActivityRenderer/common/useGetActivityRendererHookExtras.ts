import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { useEffect, useState } from 'react';

/**
 * Common data that will be used across all activities
 */
export const useGetActivityRendererHookExtras = <
  ActivityAnswerType,
  ActivityAnswerErrorType,
>(
  initalAnswer: ActivityAnswerType,
  options: { onDataRestored?: () => void } = {},
) => {
  const { machineService: activityRendererMachineService } =
    useActivityRendererContext();

  const [userAnswer, setUserAnswer] =
    useState<ActivityAnswerType>(initalAnswer);
  const [answerErrors, setAnswerErrors] =
    useState<ActivityAnswerErrorType | null>(null);

  useEffect(() => {
    return activityRendererMachineService.subscribe(state => {
      if (state.event.type === 'RESTORE_DATA') {
        console.log('Restore data');
        setUserAnswer(state.context.userAnswer);
        setAnswerErrors(state.context.answerError);
        options.onDataRestored?.();
      }
    }).unsubscribe;
  }, [activityRendererMachineService, options, setAnswerErrors, setUserAnswer]);

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
    isShowResultState: activityRendererMachineService
      .getSnapshot()
      ?.matches('WORKING_STATE.RESULT'),
    canFinish: activityRendererMachineService
      .getSnapshot()
      .can({ type: 'finish', userAnswer }),
  };
};
