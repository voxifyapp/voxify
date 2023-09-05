import { ActivityRenderer } from '@voxify/modules/main/components/ActivityRenderer/ActivityRenderer';
import { ActivityRendererOnCompleteType } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { ActivityRendererMachineRestoreDataType } from '@voxify/modules/main/components/ActivityRenderer/activityRendererMachine';
import { completedActivitiesAtom } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import { useActivityResponse } from '@voxify/modules/main/screens/LessonScreen/components/hooks/useActivityResponse';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useSetAtom } from 'jotai';
import React, { useCallback } from 'react';

type Props = {
  activity: ActivityEntity;
  restoreData?: ActivityRendererMachineRestoreDataType;
  isActive: boolean;
};

export const ActivityStep = React.memo(
  ({ activity, restoreData, isActive }: Props) => {
    const { mutate } = useActivityResponse({ activityEntity: activity });

    const setCompletedActivities = useSetAtom(completedActivitiesAtom);

    const onActivityResultsCallback: ActivityRendererOnCompleteType =
      useCallback(
        async data => {
          setCompletedActivities(prev => ({
            ...prev,
            [activity.id]: data,
          }));
          mutate({
            responseData: data.userAnswer,
            timeTaken: data.timeTakenToCompleteInSeconds,
            result: data.result,
          });
        },
        [activity.id, mutate, setCompletedActivities],
      );

    return (
      <ActivityRenderer
        isActive={isActive}
        restoreData={restoreData}
        activityEntity={activity}
        onActivityResults={onActivityResultsCallback}
      />
    );
  },
);
