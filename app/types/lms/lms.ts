import { BaseEntity } from '@voxify/types/common/base';

export type LessonEntity = BaseEntity & {
  unitId: string;
  order: number;
  title: string;
};
