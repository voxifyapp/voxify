import { BaseEntity } from '@/types/base';
import { ProficiencyLevel } from '@/types/profile';

export type Course = {
  title: string;
  proficiencyLevel: ProficiencyLevel;
} & BaseEntity;
