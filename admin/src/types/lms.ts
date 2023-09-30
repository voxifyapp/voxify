import { BaseEntity } from '@/types/base';
import { ProficiencyLevel } from '@/types/profile';
import { ActivityType } from '@packages/activity-builder';

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

export type Activity = {
  type: ActivityType;
  order: number;
  lessonId?: string;
  data: object;
  published: boolean;
} & BaseEntity;
