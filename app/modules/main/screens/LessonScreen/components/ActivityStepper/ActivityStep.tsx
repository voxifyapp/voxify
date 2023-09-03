import { ActivityRenderer } from '@voxify/modules/main/components/ActivityRenderer/ActivityRenderer';
import { ActivityRendererOnCompleteType } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { completedActivitiesAtom } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import { useActivityResponse } from '@voxify/modules/main/screens/LessonScreen/components/hooks/useActivityResponse';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useSetAtom } from 'jotai';
import React, { useCallback } from 'react';

type Props = {
  activity: ActivityEntity;
};

export const ActivityStep = ({ activity }: Props) => {
  const { mutate } = useActivityResponse({ activityEntity: activity });
  const setCompletedActivities = useSetAtom(completedActivitiesAtom);

  const onActivityResultsCallback = useCallback<ActivityRendererOnCompleteType>(
    async data => {
      setCompletedActivities(prev => ({
        ...prev,
        [activity.id]: { ...data },
      }));
      console.log('MUTATE');
      // mutate({
      //   responseData: data.data,
      //   timeTaken: data.timeTakenToCompleteInSeconds,
      //   result: data.result,
      // });
    },
    [activity.id, setCompletedActivities],
  );
  return (
    <ActivityRenderer
      activityEntity={activity}
      onActivityResults={onActivityResultsCallback}
    />
  );
};
