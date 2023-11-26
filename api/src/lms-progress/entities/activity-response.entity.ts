import { Profile } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { LessonResponse } from 'src/lms-progress/entities/lesson-response.entity';
import { Activity } from 'src/lms/entities/activity.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

export enum ActivityResponseResultType {
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
  result: ActivityResponseResultType;

  @ManyToOne(() => Profile, {
    onDelete: 'CASCADE',
  })
  profile: Profile;
  @Column()
  @Index('activity-profile-id-index', { synchronize: false })
  profileId: string;

  @ManyToOne(() => LessonResponse, {
    onDelete: 'CASCADE',
  })
  lessonResponse: LessonResponse;
  @Column()
  lessonResponseId: string;

  @ManyToOne(() => Activity, {
    onDelete: 'CASCADE',
  })
  activity: Activity;
  @Column()
  activityId: string;
}
