import { ActivityRenderer } from '@voxify/modules/main/components/ActivityRenderer/ActivityRenderer';
import { ActivityEntity } from '@voxify/types/lms/lms';
import React from 'react';

type Props = {
  activity: ActivityEntity;
};

export const ActivityStep = ({ activity }: Props) => {
  return (
    <ActivityRenderer
      activity={activity}
      onComplete={async data => console.log(data)}
    />
  );
};
