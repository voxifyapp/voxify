import { createCtx } from '@voxify/common/utils/contextUtils';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';

export type ActivityRendererOnCompleteType = (data: {
  timeTakenToCompleteInMillis: number;
  data: any;
  result: ActivityResponseResultType;
}) => any;

type ContextData = {
  onActivityResults: ActivityRendererOnCompleteType;
};

export function useCreateActivityRendererContext({
  onActivityResults,
}: ContextData) {
  return {
    onActivityResults,
  };
}

export const [
  useActivityRendererContext,
  ActivityRendererContextProvider,
  ActivityRendererContextConsumer,
] = createCtx<ReturnType<typeof useCreateActivityRendererContext>>();
