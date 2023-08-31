import { createCtx } from '@voxify/common/utils/contextUtils';

type ContextData = {
  onComplete: (data: { timeTakenToCompleteInMillis: number }) => any;
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
