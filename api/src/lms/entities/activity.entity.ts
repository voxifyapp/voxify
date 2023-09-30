import { BaseEntity } from 'src/common/entities/base.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ActivityType } from '@packages/activity-builder';

@Entity()
export class Activity extends BaseEntity {
  @Column({
    comment: 'What type of activity is this?',
    type: 'enum',
    enum: ActivityType,
  })
  type: ActivityType;

  @Column({
    comment: 'The heading of the activity',
    type: 'text',
    default: '',
  })
  heading: string;

  @Column({
    comment: 'The data related to the activity',
    type: 'jsonb',
    default: {},
  })
  data: object;

  @Column({
    comment: 'The order of this activity in the lesson',
  })
  order: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.activities, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  lesson: Lesson;

  @Column({ nullable: true })
  lessonId: string;

  @Column({ default: false, comment: 'Is this visible to users' })
  published: boolean;
}
