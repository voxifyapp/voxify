import { FillInTheBlanksActivity } from '@packages/activity-builder';
import { createCtx } from '@voxify/common/utils/contextUtils';

type ContextData = {
  activity: FillInTheBlanksActivity;
};

export function useCreateTextContext({ activity }: ContextData) {
  return {
    activity,
  };
}

export const [useTextContext, TextContextProvider, TextContextConsumer] =
  createCtx<ReturnType<typeof useCreateTextContext>>();
