import { LessonResponseStatus } from '@voxify/types/lms-progress/lesson-response';
import { LessonEntity, UnitEntity } from '@voxify/types/lms/lms';

export type UnitWithAssociatedLessons = UnitEntity & {
  lessonsWithStatus: LessonWithStatus[];
};

type LessonWithStatus = LessonEntity & {
  lessonCompletionStatus: LessonResponseStatus | null;
};

export type ProfileProgress = Record<string, LessonWithStatus[]>;
