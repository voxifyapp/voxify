import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminProfile } from 'src/admin/entities/admin-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminProfileService {
  constructor(
    @InjectRepository(AdminProfile)
    private adminProfileRepository: Repository<AdminProfile>,
  ) {}

  async findProfileForUser(userId: string) {
    return await this.adminProfileRepository.findOneBy({ userId });
  }
}
