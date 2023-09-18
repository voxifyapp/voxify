import {
  FillInTheBlanksActivity,
  FormASentenceActivity,
  MultipleChoiceActivity,
  PronunciationActivity,
  VideoActivity,
} from '@packages/activity-builder';
import { FillInTheBlanks } from '@voxify/modules/main/screens/LessonScreen/components/FillInTheBlanks';
import { FormASentence } from '@voxify/modules/main/screens/LessonScreen/components/FormASentence';
import { MultipleChoice } from '@voxify/modules/main/screens/LessonScreen/components/MultipleChoice';
import { Pronunciation } from '@voxify/modules/main/screens/LessonScreen/components/Pronunciation/Pronunciation';
import { Video } from '@voxify/modules/main/screens/LessonScreen/components/Video';
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

  if (activity.type === ActivityType.MULTIPLE_CHOICE) {
    return (
      <MultipleChoice
        activity={new MultipleChoiceActivity(activity.data as any)}
      />
    );
  }

  if (activity.type === ActivityType.VIDEO) {
    return <Video activity={new VideoActivity(activity.data as any)} />;
  }

  if (activity.type === ActivityType.PRONUNCIATION) {
    return (
      <Pronunciation
        activity={new PronunciationActivity(activity.data as any)}
      />
    );
  }

  return <H1>Activity 2</H1>;
};
