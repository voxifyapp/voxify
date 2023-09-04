import { createCtx } from '@voxify/common/utils/contextUtils';
import {
  ActivityRendererMachineRestoreDataType,
  activityRendererMachine,
} from '@voxify/modules/main/components/ActivityRenderer/activityRendererMachine';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';

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
  restoreData,
}: ContextData) {
  const [_, __, machineService] = useMachine(activityRendererMachine);

  useEffect(() => {
    if (machineService.initialized) {
      if (restoreData) {
        machineService.send({ type: 'RESTORE_DATA', restoreData });
      } else {
        machineService.send({ type: 'FOCUSED' });
      }
    }
  }, [machineService, machineService.initialized, restoreData]);

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
