import {
  CreateLessonResponsePostData,
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
