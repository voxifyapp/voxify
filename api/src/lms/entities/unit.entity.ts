import { BaseEntity } from 'src/common/entities/base.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Unit extends BaseEntity {
  @Column({
    comment: 'The title of the unit',
    type: 'text',
  })
  title: string;

  @Column({
    comment: 'The order of this unit in the course',
  })
  order: number;

  @ManyToOne(() => Course, (course) => course.units, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  course: Course;

  @Column({ nullable: true })
  courseId: string;

  @OneToMany(() => Lesson, (lesson) => lesson.unit)
  lessons: Lesson[];

  @Column({ default: false, comment: 'Is this visible to users' })
  published: boolean;
}
