import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { useMutation } from 'react-query';

// We should only use this for batch updates of activity orders. This is because
// we are not invalidating anything here. Make sure to invalidate the react-query cache after.
export const useUpdateOrderMutation = () => {
  return useMutation((data: { activityId: string; order: number }) =>
    clientFetchApiWithAuth(`/admin/activities/${data.activityId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        order: data.order,
      }),
    }),
  );
};
