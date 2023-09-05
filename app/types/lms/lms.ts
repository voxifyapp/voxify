import { BaseEntity } from '@voxify/types/common/base';

export type LessonEntity = BaseEntity & {
  unitId: string;
  order: number;
  title: string;
};

export enum ActivityType {
  VIDEO = 'VIDEO',
  FILL_IN_THE_BLANKS = 'FILL_IN_THE_BLANKS',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  PRONUNCIATION = 'PRONUNCIATION',
  FORM_A_SENTENCE = 'FORM_A_SENTENCE',
}

export type ActivityEntity = BaseEntity & {
  data: object;
  lessonId: string;
  type: ActivityType;
};
