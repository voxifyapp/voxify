import { createCtx } from '@voxify/common/utils/contextUtils';
import { ActivityResponseResultType } from '@voxify/types/lms-progress/acitivity-response';

export type ActivityRendererOnCompleteType = (data: {
  timeTakenToCompleteInMillis: number;
  data: any;
  result: ActivityResponseResultType;
}) => any;

type ContextData = {
  onComplete: ActivityRendererOnCompleteType;
};

export function useCreateActivityRendererContext({ onComplete }: ContextData) {
  return {
    onComplete,
  };
}

export const [
  useActivityRendererContext,
  ActivityRendererContextProvider,
  ActivityRendererContextConsumer,
] = createCtx<ReturnType<typeof useCreateActivityRendererContext>>();
