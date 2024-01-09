import { useMutation } from '@tanstack/react-query';
import {
  CreateLessonResponsePostData,
  UpdateLessonResponsePostData,
  createLessonResponse,
  updateLessonResponse,
} from '@voxify/api/lms-progress/lesson-response';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';

export const useCreateLessonResponse = () => {
  return useMutation({
    mutationFn: (data: CreateLessonResponsePostData) =>
      createLessonResponse({ ...data }),
  });
};

export const useUpdateLessonResponse = (lessonId: string) => {
  const markLessonsAsComplete = useProfileProgressStore(
    state => state.markLessonsAsComplete,
  );
  return useMutation({
    mutationFn: (data: UpdateLessonResponsePostData) => {
      return updateLessonResponse({ ...data });
    },
    onSuccess: updatedLessonResponse => {
      if (updatedLessonResponse.status === LessonResponseStatus.COMPLETED) {
        markLessonsAsComplete([lessonId]);
      }
    },
  });
};
