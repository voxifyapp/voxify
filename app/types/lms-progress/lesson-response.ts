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
