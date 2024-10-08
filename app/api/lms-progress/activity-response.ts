import { authAxios } from '@voxify/axiosClient';
import { ActivityResponseEntity } from '@voxify/types/lms-progress/activity-response';

export type CreateActivityResponsePostData = Pick<
  ActivityResponseEntity,
  'result' | 'timeTaken' | 'responseData' | 'activityId' | 'lessonResponseId'
>;
export const createActivityResponse = async (
  data: CreateActivityResponsePostData,
): Promise<ActivityResponseEntity> => {
  return (await authAxios.post('/lms-progress/activity-responses', data)).data;
};
