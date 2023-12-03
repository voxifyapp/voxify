import { BaseEntity } from '@voxify/types/common/base';

export enum LessonResponseStatus {
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
}

export interface LessonResponseEntity extends BaseEntity {
  status: LessonResponseStatus;
  /** In seconds */
  timeTaken: number;
  profileId: string;
  lessonId: string;
  lessonResponseId: string;
}

export type ProfileProgressResult = {
  result: ProfileProgress[];
};

export type ProfileProgress = Record<string, ProfileProgressInfo[]>;

export type ProfileProgressInfo = {
  lesson_id: string;
  lesson_createdAt: string;
  lesson_title: string;
  lesson_order: number;
  unit_id: string;
  unit_createdAt: string;
  unit_title: string;
  unit_order: number;
  lesson_status: LessonResponseStatus;
};
