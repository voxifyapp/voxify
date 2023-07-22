import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from 'src/auth/profile/profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/auth/profile/profile.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FirebaseService } from 'src/auth/firebase/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository, AuthGuard, FirebaseService],
  exports: [AuthGuard],
})
export class ProfileModule {}
