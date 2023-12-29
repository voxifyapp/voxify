import { LessonResponseStatus } from '@/src/lms-progress/entities/lesson-response.entity';
import { Lesson } from '@/src/lms/entities/lesson.entity';
import { Unit } from '@/src/lms/entities/unit.entity';

export type UnitWithLessonsAndLessonCompletionStatus = Unit & {
  lessonsWithStatus: (Lesson & {
    lessonCompletionStatus: LessonResponseStatus;
  })[];
};
