import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import { ProfileProgress } from '@voxify/types/lms-progress/profile-progress';
import { zipObject } from 'lodash';
import { create } from 'zustand';

export type CourseProgressionState = {
  // Lesson.id => LessonResponseStatus - Used to track whether a lesson is competed or not
  lessonStatus: { [lessonId: string]: LessonResponseStatus };
  completedUnits: Set<string>;
};

export type ProgressActions = {
  setProfileProgress: (profProgress: ProfileProgress) => void;
  markLessonsAsComplete: (lessonId: string[]) => void;
  markUnitCompleted: (unitId: string) => void;
  setCompletedUnits: (completedUnits: Set<string>) => void;
};

/**
 * We use this store to track all progress related to a course for a user.
 */
export const useProfileProgressStore = create<
  CourseProgressionState & ProgressActions
>(set => ({
  // State
  lessonStatus: {},
  completedUnits: new Set(),

  // Actions
  setProfileProgress: (profProgress: ProfileProgress) => {
    set((state: CourseProgressionState) => ({
      ...state,
      profileProgress: profProgress,
    }));
  },
  setCompletedUnits: (completedUnits: Set<string>) => {
    set((state: CourseProgressionState) => ({
      ...state,
      completedUnits,
    }));
  },
  markLessonsAsComplete: (lessonIds: string[]) => {
    set(state => ({
      lessonStatus: {
        ...state.lessonStatus,
        // for each lesson id in lessonIds set the lesson status to completed using lodash
        ...zipObject(
          lessonIds,
          lessonIds.map(() => LessonResponseStatus.COMPLETED),
        ),
      },
    }));
  },
  markUnitCompleted: (unitId: string) => {
    set((state: CourseProgressionState) => ({
      ...state,
      completedUnits: new Set(state.completedUnits).add(unitId),
    }));
  },
}));
