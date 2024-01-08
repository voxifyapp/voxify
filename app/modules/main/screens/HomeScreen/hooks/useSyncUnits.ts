import { useGetUnitResponses } from '@voxify/modules/main/screens/HomeScreen/hooks/useGetUnitResponses';
import { useGetUnitsWithAssociatedLessonsForCourse } from '@voxify/modules/main/screens/HomeScreen/hooks/useGetUnitsWithAssociatedLessons';
import { useCreateUnitResponse } from '@voxify/modules/main/screens/LessonScreen/hooks/unitResponseHooks';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import { useEffect, useMemo } from 'react';

/**
 * This hooks will mark the units as completed whenever all the lessons are completed
 * This will create a unit response for each unit that is completed.
 */
export const useSyncUnits = (courseId: string) => {
  const completedUnits = useProfileProgressStore(state => state.completedUnits);
  const lessonStatus = useProfileProgressStore(state => state.lessonStatus);
  const markUnitsAsComplete = useProfileProgressStore(
    state => state.markUnitsAsComplete,
  );

  const { isLoading: isGetUnitResponsesLoading, error: getUnitResponsesError } =
    useGetUnitResponses();

  const createUnitResponseMutation = useCreateUnitResponse();

  const {
    data: unitsWithAssociatedLessons,
    isLoading: isGetUnitsLoading,
    error: getUnitsError,
  } = useGetUnitsWithAssociatedLessonsForCourse(courseId);

  const isRequiredDataLoading = isGetUnitsLoading || isGetUnitResponsesLoading;

  const unitsWithoutUnitResponses = unitsWithAssociatedLessons?.filter(
    unit => !completedUnits[unit.id],
  );

  const newUnitIdsToMarkComplete = useMemo(() => {
    return (unitsWithoutUnitResponses || [])
      .map(unit => {
        // If all the lessons are completed mark the unit as completed
        const areAllLessonsCompleted =
          unit.lessonsWithStatus.filter(
            lesson =>
              lessonStatus[lesson.id] !== LessonResponseStatus.COMPLETED,
          ).length === 0;

        // For some reason there is a unit without any lessons, let's not mark it as incomplete
        if (unit.lessonsWithStatus.length === 0) {
          return null;
        }

        if (areAllLessonsCompleted) {
          return unit.id;
        }

        return null;
      })
      .filter(Boolean) as string[];
  }, [lessonStatus, unitsWithoutUnitResponses]);

  // FIXME: This might not be working properly (might create multiple unit responses etc.), need to check
  useEffect(() => {
    if (newUnitIdsToMarkComplete.length !== 0) {
      markUnitsAsComplete(newUnitIdsToMarkComplete);
      for (const unitId of newUnitIdsToMarkComplete) {
        createUnitResponseMutation.mutate({ unitId });
      }
    }
  }, [
    createUnitResponseMutation,
    markUnitsAsComplete,
    newUnitIdsToMarkComplete,
  ]);

  return {
    isLoading: isRequiredDataLoading || createUnitResponseMutation.isPending,
    error:
      createUnitResponseMutation.error ||
      getUnitsError ||
      getUnitResponsesError,
  };
};
