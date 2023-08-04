import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

export enum ProficiencyLevel {
  BEGINNER = 'Beginner',
  MEDIUM = 'Medium',
  ADVANCED = 'Advanced',
}

@Entity()
export class Profile extends BaseEntity {
  @Column({
    comment: 'Proficiency level of the user',
    type: 'enum',
    enum: ProficiencyLevel,
    nullable: true,
  })
  proficiencyLevel: ProficiencyLevel;

  @Column({
    comment:
      'Controls access to the platform, for now we need to just set it to some date based on free trial',
    type: 'date',
    nullable: true,
  })
  subscriptionEndDate: Date;

  @Column({
    comment: 'User ID associated with the profile',
    type: 'text',
    unique: true,
  })
  userId: string;
}
