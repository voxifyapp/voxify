import { createCtx } from '@voxify/common/utils/contextUtils';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';
import { ActivityEntity } from '@voxify/types/lms/lms';

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
  return {
    onActivityResults,
    activityEntity,
  };
}

export const [
  useActivityRendererContext,
  ActivityRendererContextProvider,
  ActivityRendererContextConsumer,
] = createCtx<ReturnType<typeof useCreateActivityRendererContext>>();
