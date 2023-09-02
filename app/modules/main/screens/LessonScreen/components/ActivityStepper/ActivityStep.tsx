import { ActivityRenderer } from '@voxify/modules/main/components/ActivityRenderer/ActivityRenderer';
import { useActivityResponse } from '@voxify/modules/main/screens/LessonScreen/components/hooks/useActivityResponse';
import { ActivityEntity } from '@voxify/types/lms/lms';
import React from 'react';

type Props = {
  activity: ActivityEntity;
};

export const ActivityStep = ({ activity }: Props) => {
  const { mutate } = useActivityResponse({ activityEntity: activity });
  return (
    <ActivityRenderer
      activityEntity={activity}
      onActivityResults={data =>
        mutate({
          responseData: data.data,
          timeTaken: data.timeTakenToCompleteInMillis / 1000,
          result: data.result,
        })
      }
    />
  );
};
