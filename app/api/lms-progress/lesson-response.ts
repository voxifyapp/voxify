import { authAxios } from '@voxify/axiosClient';
import { LessonResponseEntity } from '@voxify/types/lms-progress/lesson-response';
import { UnitWithAssociatedLessons } from '@voxify/types/lms-progress/profile-progress';

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

export const GET_UNITS_WITH_LESSON_COMPLETION =
  'GET_UNITS_WITH_LESSON_COMPLETION';
export const getUnitsWithAssociatedLessonsForCourse = async (
  courseId: string,
): Promise<UnitWithAssociatedLessons[]> => {
  const result = (
    await authAxios.get(
      `/lms-progress/lesson-responses/get-unit-lessons?courseId=${courseId}`,
    )
  ).data;
  return result;
};
