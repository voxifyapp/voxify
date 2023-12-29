import { useQuery } from '@tanstack/react-query';
import {
  GET_UNITS_WITH_LESSON_COMPLETION,
  getUnitsWithAssociatedLessonsForCourse,
} from '@voxify/api/lms-progress/lesson-response';
import { useProfileProgressStore } from '@voxify/modules/main/store/profileProgress';
import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import { flatMap } from 'lodash';
import { useEffect } from 'react';

/**
 * Get all units along with associated lessons for a course. This also includes the completion status of each lesson.
 */
export const useGetUnitsWithAssociatedLessonsForCourse = (courseId: string) => {
  const { markLessonsAsComplete } = useProfileProgressStore();

  const mutation = useQuery({
    queryFn: getUnitsWithAssociatedLessonsForCourse.bind(null, courseId),
    queryKey: [GET_UNITS_WITH_LESSON_COMPLETION, courseId],
    enabled: !!courseId,
  });

  const unitsWithAssociatedLessons = mutation.data;

  useEffect(() => {
    if (unitsWithAssociatedLessons) {
      const allLessons = flatMap(
        unitsWithAssociatedLessons,
        unit => unit.lessonsWithStatus,
      );
      const completedLessonIds = allLessons
        .filter(
          lesson =>
            lesson.lessonCompletionStatus === LessonResponseStatus.COMPLETED,
        )
        .map(lesson => lesson.id);
      markLessonsAsComplete(completedLessonIds);
    }
  }, [markLessonsAsComplete, unitsWithAssociatedLessons]);

  return mutation;
};
