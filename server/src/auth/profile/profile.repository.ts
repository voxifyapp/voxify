import { Injectable } from '@nestjs/common';
import { Profile } from 'src/auth/profile/profile.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(private dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }
}
