'use client';

import { clientFetchApiWithAuth } from '@/lib/clientFetch';
import { Button } from '@mui/material';
import router from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

const usePublishMutation = ({
  type,
  invalidations = [],
}: {
  /** The entity that we want to make publishable */
  type: 'activities' | 'lessons' | 'units';
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

export default function PublishButton({
  type,
  invalidations,
  entityId,
  isPublished,
}: {
  /** The entity that we want to make publishable */
  type: 'activities' | 'lessons' | 'units';
  invalidations: string[];

  /** The lesson, unit, activity id */
  entityId: string;
  isPublished: boolean;
}) {
  const publishMutation = usePublishMutation({
    type,
    invalidations,
  });

  return (
    <Button
      disabled={publishMutation.isLoading}
      onClick={() =>
        publishMutation.mutate({
          id: entityId,
          published: !isPublished,
        })
      }>
      {isPublished ? 'Unpublish' : 'Publish'}
    </Button>
  );
}
