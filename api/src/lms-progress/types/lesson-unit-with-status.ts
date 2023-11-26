import { LessonResponseStatus } from 'src/lms-progress/entities/lesson-response.entity';

export type LessonUnitWithStatus = {
  lesson_id: string;
  lesson_createdAt: string;
  lesson_title: string;
  lesson_order: number;
  unit_id: string;
  unit_createdAt: string;
  unit_title: string;
  unit_order: number;
  status: LessonResponseStatus;
};

type LessonResp = {
  lesson_title: string;
  lesson_order: number;
  lesson_id: string;
  lesson_status?: LessonResponseStatus;
};