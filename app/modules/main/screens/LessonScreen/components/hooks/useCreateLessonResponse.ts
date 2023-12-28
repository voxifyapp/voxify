import {
  CreateLessonResponsePostData,
  UpdateLessonResponsePostData,
  createLessonResponse,
  updateLessonResponse,
} from '@voxify/api/lms-progress/lesson-response';
import { lessonCompletionInfoAtom } from '@voxify/modules/main/screens/LessonScreen/LessonScreen';
import {
  ProgressActions,
  useProfileProgressStore,
} from '@voxify/modules/main/screens/useProfileProgressStore';
import { useSetAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';

export const useCreateLessonResponse = () => {
  return useMutation({
    mutationFn: (data: CreateLessonResponsePostData) =>
      createLessonResponse({ ...data }),
  });
};

export const useUpdateLessonResponse = (lessonId: string, unitId: string) => {
  const [markLessonComplete] = useProfileProgressStore(
    (state: ProgressActions) => [state.markLessonComplete],
  );
  const setLessonCompletion = useSetAtom(lessonCompletionInfoAtom);
  return useMutation({
    mutationFn: (data: UpdateLessonResponsePostData) => {
      return updateLessonResponse({ ...data });
    },
    onSuccess: _ => {
      markLessonComplete(lessonId, unitId);
      setLessonCompletion(prev => {
        return new Map(prev).set(lessonId, {
          ...prev.get(lessonId)!,
          isCompleted: true,
        });
      });
    },
  });
};
