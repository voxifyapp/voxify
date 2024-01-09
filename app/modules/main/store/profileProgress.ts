import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import { ProfileProgress } from '@voxify/types/lms-progress/profile-progress';
import { zipObject } from 'lodash';
import { create } from 'zustand';

export type CourseProgressionState = {
  // Lesson.id => LessonResponseStatus - Used to track whether a lesson is competed or not
  lessonStatus: { [lessonId: string]: LessonResponseStatus };
  completedUnits: { [lessonId: string]: boolean };
};

export type ProgressActions = {
  setProfileProgress: (profProgress: ProfileProgress) => void;
  markLessonsAsComplete: (lessonId: string[]) => void;
  markUnitsAsComplete: (unitId: string[]) => void;
};

/**
 * We use this store to track all progress related to a course for a user.
 */
export const useProfileProgressStore = create<
  CourseProgressionState & ProgressActions
>(set => ({
  // State
  lessonStatus: {},
  completedUnits: {},

  // Actions
  setProfileProgress: (profProgress: ProfileProgress) => {
    set((state: CourseProgressionState) => ({
      ...state,
      profileProgress: profProgress,
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
  markUnitsAsComplete: (unitIds: string[]) => {
    set(state => ({
      completedUnits: {
        ...state.completedUnits,
        ...zipObject(
          unitIds,
          unitIds.map(() => true),
        ),
      },
    }));
  },
}));
