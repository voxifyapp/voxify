import { createCtx } from '@voxify/common/utils/contextUtils';
import {
  ActivityRendererMachineRestoreDataType,
  activityRendererMachine,
} from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.machine';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useMachine } from '@xstate/react';
import { useCallback } from 'react';

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
  index?: number;
};

export function useCreateActivityRendererContext({
  onActivityResults,
  activityEntity,
  index,
}: ContextData) {
  const [_, __, machineService] = useMachine(activityRendererMachine);

  const restart = useCallback(() => {
    machineService.send('RESTART');
  }, [machineService]);

  return {
    onActivityResults,
    activityEntity,
    machineService,
    index,
    restart,
  };
}

export const [
  useActivityRendererContext,
  ActivityRendererContextProvider,
  ActivityRendererContextConsumer,
] = createCtx<ReturnType<typeof useCreateActivityRendererContext>>();
