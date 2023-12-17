import { useCreateUnitResponse } from '@voxify/modules/main/screens/LessonScreen/components/hooks/useUnitResponse';
import {
  ProgressActions,
  ProgressState,
  useProfileProgressStore,
} from '@voxify/modules/main/screens/useProfileProgressStore';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import { useEffect } from 'react';

export const useUnitSyncCompletion = ({ unitId }: { unitId: string }) => {
  const { mutate: createUnitResponseMutate } = useCreateUnitResponse();
  const [profileProgress, completedUnits, markUnitCompleted] =
    useProfileProgressStore((state: ProgressState & ProgressActions) => [
      state.profileProgress,
      state.completedUnits,
      state.markUnitCompleted,
    ]);

  useEffect(() => {
    if (
      !completedUnits.has(unitId) &&
      profileProgress[unitId].filter(
        lesson =>
          lesson.lessonCompletionStatus !== LessonResponseStatus.COMPLETED,
      ).length === 0
    ) {
      markUnitCompleted(unitId);
      createUnitResponseMutate({ unitId });
    }
  }, [
    completedUnits,
    createUnitResponseMutate,
    markUnitCompleted,
    profileProgress,
    unitId,
  ]);
};
