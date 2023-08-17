import { authAxios } from '@voxify/axiosClient';
import { ActivityEntity, LessonEntity } from '@voxify/types/lms/lms';

export const GET_LESSON = 'GET_LESSON_WITH_ACTIVITIES';
export const getLesson = async (lessonId: string): Promise<LessonEntity> => {
  return (await authAxios.get(`/lms/lesson/${lessonId}`)).data;
};

export const GET_LESSON_ACTIVITIES = 'GET_LESSON_ACTIVITIES';
export const getLessonActivities = async (
  lessonId: string,
): Promise<ActivityEntity[]> => {
  return (await authAxios.get(`/lms/lesson/${lessonId}/activities`)).data;
};
