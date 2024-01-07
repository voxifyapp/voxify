import { ActivityRenderer } from '@voxify/modules/main/components/ActivityRenderer/ActivityRenderer';
import { ActivityRendererOnCompleteType } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.context';
import { ActivityRendererMachineRestoreDataType } from '@voxify/modules/main/components/ActivityRenderer/activityRenderer.machine';
import { completedActivitiesAtom } from '@voxify/modules/main/screens/LessonScreen/components/ActivityStepper/ActivityStepper';
import { useCreateActivityResponse } from '@voxify/modules/main/screens/LessonScreen/hooks/useActivityResponse';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useSetAtom } from 'jotai';
import React, { useCallback } from 'react';

type Props = {
  activity: ActivityEntity;
  restoreData?: ActivityRendererMachineRestoreDataType;
  isActive: boolean;
  index?: number;
  lessonResponseId: string;
};

export const ActivityStep = React.memo(
  ({ activity, restoreData, isActive, index, lessonResponseId }: Props) => {
    const { mutate: createActivityResponse } = useCreateActivityResponse({
      activityEntity: activity,
    });

    const setCompletedActivities = useSetAtom(completedActivitiesAtom);

    const onActivityResultsCallback: ActivityRendererOnCompleteType =
      useCallback(
        async data => {
          setCompletedActivities(prev => ({
            ...prev,
            [activity.id]: data,
          }));
          createActivityResponse({
            responseData: {
              userAnswer: data.userAnswer,
              answerError: data.answerError,
            },
            timeTaken: data.timeTakenToCompleteInSeconds,
            result: data.result,
            lessonResponseId,
          });
        },
        [
          activity.id,
          lessonResponseId,
          createActivityResponse,
          setCompletedActivities,
        ],
      );

    return (
      <ActivityRenderer
        index={index}
        isActive={isActive}
        restoreData={restoreData}
        activityEntity={activity}
        onActivityResults={onActivityResultsCallback}
      />
    );
  },
);
