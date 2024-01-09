import { BaseEntity } from '@voxify/types/common/base';

export type LessonEntity = BaseEntity & {
  unitId: string;
  order: number;
  title: string;
  homeImageFileName: string | null;
};

export type UnitEntity = BaseEntity & {
  courseId: string;
  order: number;
  title: string;
  lessons: LessonEntity[];
};

export enum ActivityType {
  VIDEO = 'VIDEO',
  FILL_IN_THE_BLANKS = 'FILL_IN_THE_BLANKS',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  PRONUNCIATION = 'PRONUNCIATION',
  FORM_A_SENTENCE = 'FORM_A_SENTENCE',
  TEXT = 'TEXT',
}

export type ActivityEntity = BaseEntity & {
  data: object;
  heading?: string;
  lessonId: string;
  type: ActivityType;
};
