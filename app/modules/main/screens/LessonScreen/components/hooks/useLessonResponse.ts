import {
  CreateLessonResponsePostData,
  createLessonResponse,
} from '@voxify/api/lms-progress/lesson-response';
import { useMutation } from 'react-query';

export const useLessonResponse = () => {
  const mutation = useMutation((data: CreateLessonResponsePostData) => {
    return createLessonResponse({ ...data });
  });

  return {
    ...mutation,
  };
};
