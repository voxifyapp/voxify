import { ActivityRenderer } from '@voxify/modules/main/screens/LessonScreen/components/ActivityRenderer/ActivityRenderer';
import { ActivityEntity } from '@voxify/types/lms/lms';
import React from 'react';

type Props = {
  activity: ActivityEntity;
};

export const ActivityStep = ({ activity }: Props) => {
  return (
    <ActivityRenderer
      activity={activity}
      onComplete={({ timeTakenToCompleteInMillis }) =>
        console.log(timeTakenToCompleteInMillis)
      }
    />
  );
};
