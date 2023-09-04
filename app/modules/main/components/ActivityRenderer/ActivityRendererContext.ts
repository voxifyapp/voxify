import { createCtx } from '@voxify/common/utils/contextUtils';
import { activityRendererMachine } from '@voxify/modules/main/components/ActivityRenderer/activityRendererMachine';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useEffect } from 'react';
import { interpret } from 'xstate';

export type ActivityRendererOnCompleteType = (data: {
  timeTakenToCompleteInSeconds: number;
  data: any;
  result: ActivityResponseResultType;
}) => any;

type ContextData = {
  onActivityResults: ActivityRendererOnCompleteType;
  activityEntity: ActivityEntity;
};

export function useCreateActivityRendererContext({
  onActivityResults,
  activityEntity,
}: ContextData) {
  const machineService = interpret(activityRendererMachine);

  useEffect(() => {
    machineService.start();
    return () => {
      machineService.stop();
    };
  }, [machineService]);

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
