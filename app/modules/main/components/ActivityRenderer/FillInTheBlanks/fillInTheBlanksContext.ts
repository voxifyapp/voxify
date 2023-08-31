import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { useActivityRendererContext } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { fillInTheBlanksMachine } from '@voxify/modules/main/components/ActivityRenderer/FillInTheBlanks/fillInTheBlanks.machine';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import { useMachine } from '@xstate/react';

type ContextData = {
  activity: FillInTheBlanksActivity;
};

export function useCreateFillInTheBlanksContext({ activity }: ContextData) {
  const { onComplete } = useActivityRendererContext();
  const { machine, derivedValues, EventTypes } = fillInTheBlanksMachine;
  const [state, send] = useMachine(machine, {
    context: {
      activity,
      userAnswer: {},
      answerErrors: null,
      totalTimeSpentInMillis: 0,
      startTimeInMillis: 0,
    },
    services: {
      onActivityCompleted: context => () => {
        onComplete({
          timeTakenToCompleteInMillis: context.totalTimeSpentInMillis,
          data: state.context.userAnswer,
          result: ActivityResponseResultType.SUCCESS,
        });
      },
    },
  });

  return {
    ...derivedValues(state.context),
    send,
    state,
    EventTypes,
    machine,
  };
}

export const [
  useFillInTheBlanksContext,
  FillInTheBlanksContextProvider,
  FillInTheBlanksContextConsumer,
] = createCtx<ReturnType<typeof useCreateFillInTheBlanksContext>>();
