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

export const GET_LESSON_RESPONSES_WITH_LESSON_AND_UNIT =
  'GET_LESSON_RESPONSES_WITH_LESSON_AND_UNIT';
export const getLessonResponsesWithLessonAndUnit = async (
  courseId: string,
): Promise<any[]> => {
  return (
    await authAxios.get(
      `/lms-progress/lesson-responses/get-unit-lessons?courseId=${courseId}`,
    )
  ).data;
};
