import { BaseEntity } from '@voxify/types/common/base';

export enum ProficiencyLevel {
  BEGINNER = 'Beginner',
  MEDIUM = 'Medium',
  ADVANCED = 'Advanced',
}

export interface ProfileEntity extends BaseEntity {
  proficiencyLevel: ProficiencyLevel | null;
  subscriptionEndDate: Date | null;
  userId: string;
}
