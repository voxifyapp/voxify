import {
  CreateLessonResponsePostData,
  UpdateLessonResponsePostData,
  updateLessonResponse,
  createLessonResponse,
} from '@voxify/api/lms-progress/lesson-response';
import { useMutation } from 'react-query';

export const useCreateLessonResponse = () => {
  const mutation = useMutation((data: CreateLessonResponsePostData) => {
    return createLessonResponse({ ...data });
  });

  return {
    ...mutation,
  };
};

export const useUpdateLessonResponse = () => {
  return useMutation((data: UpdateLessonResponsePostData) => {
    return updateLessonResponse({ ...data });
  });
};
