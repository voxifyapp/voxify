import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';
import { createCtx } from '@voxify/common/utils/contextUtils';
import { fillInTheBlanksMachine } from '@voxify/modules/main/screens/LessonScreen/components/FillInTheBlanks/fillInTheBlanks.machine';
import { useMachine } from '@xstate/react';

type ContextData = {
  activity: FillInTheBlanksActivity;
};

export function useCreateFillInTheBlanksContext({ activity }: ContextData) {
  const { machine, derivedValues } = fillInTheBlanksMachine;
  const [state, send] = useMachine(machine, {
    context: { activity, userAnswer: {} },
  });

  return {
    ...derivedValues(state.context),
    send,
    state,
  };
}

export const [
  useFillInTheBlanksContext,
  FillInTheBlanksContextProvider,
  FillInTheBlanksContextConsumer,
] = createCtx<ReturnType<typeof useCreateFillInTheBlanksContext>>();
