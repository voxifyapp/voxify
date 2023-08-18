import { TextBlock } from '@voxify/common/activities/blocks/text-block';
import { FillInTheBlanksActivity } from '@voxify/common/activities/fill-in-the-blanks-activity';
import { ActivityEntity } from '@voxify/types/lms/lms';
import React from 'react';
import { H1 } from 'tamagui';

type Props = {
  activity: ActivityEntity;
};

export const Activity = ({ activity }: Props) => {
  const n = new FillInTheBlanksActivity();
  n.setQuestion(
    new TextBlock(
      `Hey! My name ${FillInTheBlanksActivity.blank(
        'blank1',
      )} Joe and I ${FillInTheBlanksActivity.blank('blank2')} 16 years old.`,
    ),
  );
  n.setOptions([
    new TextBlock('am'),
    new TextBlock('is'),
    new TextBlock('are'),
    new TextBlock('have'),
    new TextBlock('has'),
  ]);
  n.setAnswer({
    blank1: n.getOptions()[1].id,
    blank2: n.getOptions()[0].id,
  });
  console.log(n.build());
  return <H1>Activity 2</H1>;
};
