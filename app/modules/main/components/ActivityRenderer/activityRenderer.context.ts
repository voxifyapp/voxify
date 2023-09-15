import { createCtx } from '@voxify/common/utils/contextUtils';
import {
  ActivityRendererMachineRestoreDataType,
  activityRendererMachine,
} from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.machine';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/activity-response';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useMachine } from '@xstate/react';

export type ActivityRendererOnCompleteType = (data: {
  timeTakenToCompleteInSeconds: number;
  userAnswer: any;
  result: ActivityResponseResultType;
  answerError: any;
}) => any;

type ContextData = {
  onActivityResults: ActivityRendererOnCompleteType;
  activityEntity: ActivityEntity;
  restoreData?: ActivityRendererMachineRestoreDataType;
};

export function useCreateActivityRendererContext({
  onActivityResults,
  activityEntity,
}: ContextData) {
  const [_, __, machineService] = useMachine(activityRendererMachine);

  return {
    onActivityResults,
    activityEntity,
    machineService,
  };
}

export const [
  useActivityRendererContext,
  ActivityRendererContextProvider,
  ActivityRendererContextConsumer,
] = createCtx<ReturnType<typeof useCreateActivityRendererContext>>();
