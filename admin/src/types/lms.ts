import { BaseEntity } from '@/types/base';
import { ProficiencyLevel } from '@/types/profile';

export type Course = {
  title: string;
  proficiencyLevel: ProficiencyLevel;
} & BaseEntity;

export type Unit = {
  title: string;
  order: number;
  courseId: string;
} & BaseEntity;

export type Lesson = {
  title: string;
  order: number;
  unitId?: string;
} & BaseEntity;

export enum ActivityType {
  VIDEO = 'VIDEO',
  FILL_IN_THE_BLANKS = 'FILL_IN_THE_BLANKS',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  PRONUNCIATION = 'PRONUNCIATION',
  FORM_A_SENTENCE = 'FORM_A_SENTENCE',
}

export type Activity = {
  type: ActivityType;
  order: number;
  lessonId?: string;
  data: object;
} & BaseEntity;
