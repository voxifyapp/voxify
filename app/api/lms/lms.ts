import { authAxios } from '@voxify/axiosClient';
import { LessonEntity } from '@voxify/types/lms/lms';

export const GET_LESSON_WITH_ACTIVITIES = 'GET_LESSON_WITH_ACTIVITIES';
export const getLessonWithActivities = async (
  lessonId: string,
): Promise<LessonEntity> => {
  return (await authAxios.get(`/lms/lesson/${lessonId}`)).data;
};
