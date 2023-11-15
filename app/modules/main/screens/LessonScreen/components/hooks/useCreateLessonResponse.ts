import {
  CreateLessonResponsePostData,
<<<<<<< HEAD
  UpdateLessonResponsePostData,
  createLessonResponse,
  updateLessonResponse,
=======
  createLessonResponse,
>>>>>>> e221817833aa94ad7c91603838519b97002729ac
} from '@voxify/api/lms-progress/lesson-response';
import { useMutation } from 'react-query';

export const useCreateLessonResponse = () => {
<<<<<<< HEAD
  return useMutation((data: CreateLessonResponsePostData) => {
    return createLessonResponse({ ...data });
  });
};

export const useUpdateLessonResponse = () => {
  return useMutation((data: UpdateLessonResponsePostData) => {
    return updateLessonResponse({ ...data });
  });
=======
  const mutation = useMutation((data: CreateLessonResponsePostData) => {
    return createLessonResponse({ ...data });
  });

  return {
    ...mutation,
  };
>>>>>>> e221817833aa94ad7c91603838519b97002729ac
};
