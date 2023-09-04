import { ActivityRenderer } from '@voxify/modules/main/components/ActivityRenderer/ActivityRenderer';
import { ActivityRendererOnCompleteType } from '@voxify/modules/main/components/ActivityRenderer/ActivityRendererContext';
import { ActivityRendererMachineRestoreDataType } from '@voxify/modules/main/components/ActivityRenderer/activityRendererMachine';
import { completedActivitiesAtom } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
// import { useActivityResponse } from '@voxify/modules/main/screens/LessonScreen/components/hooks/useActivityResponse';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useSetAtom } from 'jotai';
import React from 'react';

type Props = {
  activity: ActivityEntity;
  restoreData?: ActivityRendererMachineRestoreDataType;
};

export const ActivityStep = React.memo(({ activity, restoreData }: Props) => {
  // const { mutate } = useActivityResponse({ activityEntity: activity });

  const setCompletedActivities = useSetAtom(completedActivitiesAtom);

  const onActivityResultsCallback: ActivityRendererOnCompleteType =
    async data => {
      setCompletedActivities(prev => ({
        ...prev,
        [activity.id]: data,
      }));
      console.log('MUTATE');
      // mutate({
      //   responseData: data.data,
      //   timeTaken: data.timeTakenToCompleteInSeconds,
      //   result: data.result,
      // });
    };

  return (
    <ActivityRenderer
      restoreData={restoreData}
      activityEntity={activity}
      onActivityResults={onActivityResultsCallback}
    />
  );
});
