import { Profile } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ActivityResponse } from 'src/lms-progress/entities/activity-response.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

export enum LessonResponseStatus {
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
}

/**
 * This entity only track that a lesson has been completed. Will be created when a user creates and activity response for the last activity in a lesson.
 */
@Entity()
export class LessonResponse extends BaseEntity {
  @ManyToOne(() => Lesson, {
    onDelete: 'CASCADE',
  })
  lesson: Lesson;

  @Column({
    comment:
      'The lesson that was completed, can have multiple responses for the same lesson',
  })
  lessonId: string;

  @ManyToOne(() => Profile, {
    onDelete: 'CASCADE',
  })
  profile: Profile;
  @Column()
  @Index('lesson-profile-id-index')
  profileId: string;

  @OneToMany(
    () => ActivityResponse,
    (activityResponse) => activityResponse.lessonResponse,
  )
  activityResponses: ActivityResponse[];

  @Column({
    comment: 'State of the lesson for the user',
  })
  status: LessonResponseStatus;
}
