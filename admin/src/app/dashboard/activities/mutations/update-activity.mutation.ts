'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import router from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

/**
 * A single place to handle all publish actions for lessons, units and activities.
 */
export const usePublishMutation = ({
  type,
  invalidations = [],
}: {
  type: 'activities';
  invalidations: string[];
}) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, published }: { id: string; published: boolean }) =>
      clientFetchApiWithAuth(`/admin/${type}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          published,
        }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(invalidations);
        router.back();
      },
    },
  );
};
