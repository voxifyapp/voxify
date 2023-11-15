import { Profile } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
<<<<<<< Updated upstream
import { Column, Entity, ManyToOne } from 'typeorm';
=======
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

export enum LessonResponseStatus {
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
}
>>>>>>> Stashed changes

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
  @Index()
  profileId: string;
}
