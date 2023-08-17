import { ActivityEntity } from '@voxify/types/lms/lms';
import React from 'react';
import { H1 } from 'tamagui';

type Props = {
  activity: ActivityEntity;
};

export const Activity = ({ activity }: Props) => {
  return <H1>Activity 2</H1>;
};
