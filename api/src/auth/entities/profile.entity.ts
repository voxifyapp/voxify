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
    type: 'enum',
    enum: ProficiencyLevel,
    nullable: true,
  })
  proficiencyLevel: ProficiencyLevel;

  /** We are using this temporarily before we build out a subscription system
   * This controls access to the platform, for now we need to just set it to some date based on free trial
   */
  @Column({
    type: 'date',
    nullable: true,
  })
  subscriptionEndDate: Date;

  @Column({
    type: 'text',
    /** We are making this unique as initially we'll enforce each user to have only 1 profile */
    unique: true,
  })
  userId: string;
}
