import { BaseEntity } from 'src/common/entities/base.entity';
import { Activity } from 'src/lms/entities/activity.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Lesson extends BaseEntity {
  @Column({
    comment: 'The title of the lesson',
    type: 'text',
    default: '',
  })
  title: string;

  @Column({
    comment: 'The order of this lesson in the unit',
  })
  order: number;

  @OneToMany(() => Activity, (activity) => activity.lesson)
  activities: Activity[];

  @ManyToOne(() => Unit, (unit) => unit.lessons, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  unit: Unit;
}
