import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';
import { FillInTheBlanks } from '@voxify/modules/main/screens/LessonScreen/components/FillInTheBlanks';
import { ActivityEntity, ActivityType } from '@voxify/types/lms/lms';
import React from 'react';
import { H1 } from 'tamagui';

type Props = {
  activity: ActivityEntity;
};

export const Activity = ({ activity }: Props) => {
  if (activity.type === ActivityType.FILL_IN_THE_BLANKS) {
    return (
      <FillInTheBlanks
        activity={new FillInTheBlanksActivity(activity.data as any)}
      />
    );
  }

  return <H1>Activity 2</H1>;
};
