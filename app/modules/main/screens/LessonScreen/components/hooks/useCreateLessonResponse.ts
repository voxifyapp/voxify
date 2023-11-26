import {
  CreateLessonResponsePostData,
  UpdateLessonResponsePostData,
  createLessonResponse,
  updateLessonResponse,
} from '@voxify/api/lms-progress/lesson-response';
import { useMutation } from 'react-query';

export const useCreateLessonResponse = () => {
  return useMutation((data: CreateLessonResponsePostData) => {
    return createLessonResponse({ ...data });
  });
};

export const useUpdateLessonResponse = () => {
  return useMutation((data: UpdateLessonResponsePostData) => {
    return updateLessonResponse({ ...data });
  });
};
