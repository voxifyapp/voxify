import { completedActivitiesAtom } from "@voxify/app/(app)/lesson/components/ActivityStepper/ActivityStepper";
import { useActivityResponse } from "@voxify/app/(app)/lesson/components/hooks/useActivityResponse";
import { ActivityRenderer } from "@voxify/components/ActivityRenderer/ActivityRenderer";
import { ActivityRendererOnCompleteType } from "@voxify/components/ActivityRenderer/activityRenderer.context";
import { ActivityRendererMachineRestoreDataType } from "@voxify/components/ActivityRenderer/activityRenderer.machine";
import { ActivityEntity } from "@voxify/types/lms/lms";
import { useSetAtom } from "jotai";
import React, { useCallback } from "react";

type Props = {
  activity: ActivityEntity;
  restoreData?: ActivityRendererMachineRestoreDataType;
  isActive: boolean;
  index?: number;
  lessonResponseId: string;
};

export const ActivityStep = React.memo(
  ({ activity, restoreData, isActive, index, lessonResponseId }: Props) => {
    const { mutate } = useActivityResponse({ activityEntity: activity });

    const setCompletedActivities = useSetAtom(completedActivitiesAtom);

    const onActivityResultsCallback: ActivityRendererOnCompleteType =
      useCallback(
        async (data) => {
          setCompletedActivities((prev) => ({
            ...prev,
            [activity.id]: data,
          }));
          mutate({
            responseData: {
              userAnswer: data.userAnswer,
              answerError: data.answerError,
            },
            timeTaken: data.timeTakenToCompleteInSeconds,
            result: data.result,
            lessonResponseId,
          });
        },
        [activity.id, lessonResponseId, mutate, setCompletedActivities]
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
  }
);
