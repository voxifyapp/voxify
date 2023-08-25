import { TextBlock } from '@voxify/common/activities/blocks/text-block';
import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';
import { FormASentenceActivity } from '@voxify/common/activities/form-a-sentence-activity';
import { MultipleChoiceActivity } from '@voxify/common/activities/multiple-choice-activity';
import { PronunciationActivity } from '@voxify/common/activities/pronunciation-activity';
import { FillInTheBlanks } from '@voxify/modules/main/screens/LessonScreen/components/FillInTheBlanks';
import { FormASentence } from '@voxify/modules/main/screens/LessonScreen/components/FormASentence';
import { MultipleChoice } from '@voxify/modules/main/screens/LessonScreen/components/MultipleChoice';
import { Pronunciation } from '@voxify/modules/main/screens/LessonScreen/components/Pronunciation';
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

  if (activity.type === ActivityType.PRONUNCIATION) {
    return (
      <Pronunciation
        activity={new PronunciationActivity(activity.data as any)}
      />
    );
  }

  return <H1>Activity 2</H1>;
};
