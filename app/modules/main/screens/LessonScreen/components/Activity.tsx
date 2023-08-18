import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';
import { FormASentenceActivity } from '@voxify/common/activities/form-a-sentence-activity';
import { FillInTheBlanks } from '@voxify/modules/main/screens/LessonScreen/components/FillInTheBlanks';
import { FormASentence } from '@voxify/modules/main/screens/LessonScreen/components/FormASentence';
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

  if (activity.type === ActivityType.FORM_A_SENTENCE) {
    return (
      <FormASentence
        activity={new FormASentenceActivity(activity.data as any)}
      />
    );
  }

  return <H1>Activity 2</H1>;
};
