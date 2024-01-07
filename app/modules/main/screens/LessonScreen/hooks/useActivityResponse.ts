import {
  CreateActivityResponsePostData,
  createActivityResponse,
} from '@voxify/api/lms-progress/activity-response';
import { ActivityEntity } from '@voxify/types/lms/lms';
import { useMutation } from '@tanstack/react-query';

type Props = {
  activityEntity: ActivityEntity;
};

export const useCreateActivityResponse = ({ activityEntity }: Props) => {
  return useMutation({
    mutationFn: (data: Omit<CreateActivityResponsePostData, 'activityId'>) => {
      return createActivityResponse({ ...data, activityId: activityEntity.id });
    },
  });
};
