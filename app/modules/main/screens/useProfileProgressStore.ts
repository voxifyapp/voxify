import {
  LessonResponseStatus,
  ProfileProgress,
} from '@voxify/types/lms-progress/lesson-response';
import { create } from 'zustand';

export type ProgressState = {
  profileProgress: ProfileProgress;
  completedUnits: Set<string>;
};

export type ProgressActions = {
  setProfileProgress: (profProgress: ProfileProgress) => void;
  markLessonComplete: (lessonId: string, unitId: string) => void;
  markUnitCompleted: (unitId: string) => void;
  setCompletedUnits: (completedUnits: Set<string>) => void;
};

export const useProfileProgressStore = create<ProgressState & ProgressActions>(
  set => ({
    // State
    profileProgress: {},
    completedUnits: new Set(),

    // Actions
    setProfileProgress: (profProgress: ProfileProgress) => {
      set((state: ProgressState) => ({
        ...state,
        profileProgress: profProgress,
      }));
    },
    setCompletedUnits: (completedUnits: Set<string>) => {
      set((state: ProgressState) => ({
        ...state,
        completedUnits,
      }));
    },
    markLessonComplete: (lessonId: string, unitId: string) => {
      set((state: ProgressState) => {
        const updatedProfileProgress: ProfileProgress = {
          ...state.profileProgress,
        };
        updatedProfileProgress[unitId].map(lesson => {
          if (lesson.lesson_id === lessonId) {
            lesson.lesson_status = LessonResponseStatus.COMPLETED;
          }
          return lesson;
        });
        return { ...state, profileProgress: updatedProfileProgress };
      });
    },
    markUnitCompleted: (unitId: string) => {
      set((state: ProgressState) => ({
        ...state,
        completedUnits: new Set(state.completedUnits).add(unitId),
      }));
    },
  }),
);
