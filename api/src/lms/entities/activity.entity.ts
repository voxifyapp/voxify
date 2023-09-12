import { BaseEntity } from 'src/common/entities/base.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum ActivityType {
  VIDEO = 'VIDEO',
  FILL_IN_THE_BLANKS = 'FILL_IN_THE_BLANKS',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  PRONUNCIATION = 'PRONUNCIATION',
  FORM_A_SENTENCE = 'FORM_A_SENTENCE',
}

@Entity()
export class Activity extends BaseEntity {
  @Column({
    comment: 'What type of activity is this?',
    type: 'enum',
    enum: ActivityType,
  })
  type: ActivityType;

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
}
