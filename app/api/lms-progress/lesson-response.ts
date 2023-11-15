import { authAxios } from '@voxify/axiosClient';
import { LessonResponseEntity } from '@voxify/types/lms-progress/lesson-response';

export type CreateLessonResponsePostData = Pick<
  LessonResponseEntity,
  'status' | 'lessonId'
>;

export type UpdateLessonResponsePostData = Pick<
  LessonResponseEntity,
  'status' | 'lessonResponseId'
>;

export const createLessonResponse = async (
  data: CreateLessonResponsePostData,
): Promise<LessonResponseEntity> => {
  return (await authAxios.post('/lms-progress/lesson-responses', data)).data;
};

export const updateLessonResponse = async (
  data: UpdateLessonResponsePostData,
): Promise<LessonResponseEntity> => {
  return (await authAxios.put('/lms-progress/lesson-responses', data)).data;
};
