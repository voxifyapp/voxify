import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Course extends BaseEntity {
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

  @OneToMany(() => Unit, (unit) => unit.course)
  units: Unit[];
}
