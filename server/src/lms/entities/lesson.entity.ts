import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Lesson extends BaseEntity {
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
    comment: 'The order of this lesson in the unit',
  })
  order: number;

  @ManyToOne(() => Unit, (unit) => unit.lessons)
  unit: Unit;
}
