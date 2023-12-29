import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';

export type ProfileProgressResult = {
  result: ProfileProgressByUnit[];
};

export type ProfileProgressByUnit = {
  id: string;
  createdAt: string;
  title: string;
  order: number;
  lessonsWithStatus: LessonWithStatus[];
};

type LessonWithStatus = {
  id: string;
  order: number;
  title: string;
  unitId: string;
  version: string;
  homeImageFileName: string | null;
  lessonCompletionStatus: LessonResponseStatus | null;
};

export type ProfileProgress = Record<string, LessonWithStatus[]>;
