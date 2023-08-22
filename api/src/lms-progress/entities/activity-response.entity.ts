import { Profile } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Activity } from 'src/lms/entities/activity.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

export enum ResultType {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

@Entity()
export class ActivityResponse extends BaseEntity {
  @Column({
    comment:
      'The data the user submitted for the activity. We will use this to track how they interacted with each activity',
    type: 'jsonb',
    default: {},
  })
  responseData: object;

  @Column({
    comment: 'The number of seconds the user spent on this activity',
    type: 'real',
  })
  timeTaken: number;

  @Column({
    comment: 'Did the user pass or fail this activity?',
  })
  result: ResultType;

  @ManyToOne(() => Profile, {
    onDelete: 'CASCADE',
  })
  profile: Profile;
  @Column()
  profileId: string;

  @ManyToOne(() => Activity, {
    onDelete: 'CASCADE',
  })
  activity: Activity;
  @Column()
  activityId: string;
}
