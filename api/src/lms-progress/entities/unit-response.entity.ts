import { Profile } from 'src/auth/entities/profile.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

/**
 * This entity only track that a unit has been completed. Will be created when a user creates and activity response for the last lesson in a unit.
 */
@Entity()
export class UnitResponse extends BaseEntity {
  @ManyToOne(() => Unit, {
    onDelete: 'CASCADE',
  })
  unit: Unit;
  @Column({
    comment: 'The unit that was completed',
  })
  unitId: string;

  @ManyToOne(() => Profile, {
    onDelete: 'CASCADE',
  })
  profile: Profile;
  @Column()
  @Index('unit-profile-id-index', { synchronize: false })
  profileId: string;
}
