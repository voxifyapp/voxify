import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Unit extends BaseEntity {
  @Column({
    comment: 'What proficiency level this course is for',
    type: 'enum',
    enum: ProficiencyLevel,
  })
  proficiencyLevel: ProficiencyLevel;

  @Column({
    comment: 'The title of the course',
    type: 'text',
  })
  title: string;

  @Column({
    comment: 'The order of this unit in the course',
  })
  order: number;

  @ManyToOne(() => Course, (course) => course.units)
  course: Course;
}
