import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class AdminProfile extends BaseEntity {
  @Column({
    comment: 'User ID associated with the profile',
    type: 'text',
    unique: true,
  })
  userId: string;
}
