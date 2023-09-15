import {
  CreateActivityResponsePostData,
  createActivityResponse,
} from '@voxify/api/lms-progress/activity-response';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useMutation } from 'react-query';

type Props = {
  activityEntity: ActivityEntity;
};

export const useActivityResponse = ({ activityEntity }: Props) => {
  const mutation = useMutation(
    (data: Omit<CreateActivityResponsePostData, 'activityId'>) => {
      return createActivityResponse({ ...data, activityId: activityEntity.id });
    },
  );

  return {
    ...mutation,
  };
};
