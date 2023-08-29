import { BaseEntity } from '@voxify/types/common/base';

export enum ActivityResponseResultType {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export interface ActivityResponseEntity extends BaseEntity {
  result: ActivityResponseResultType;
  timeTaken: number;
  responseData: object;
  profileId: string;
  activityId: string;
}
