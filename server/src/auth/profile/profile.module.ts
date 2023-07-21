import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from 'src/auth/profile/profile.repository';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
