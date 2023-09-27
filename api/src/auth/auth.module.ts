import { Module } from '@nestjs/common';
import { FirebaseService } from './services/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { Profile } from 'src/auth/entities/profile.entity';
import { ProfileController } from 'src/auth/profile.controller';
import { ProfileRepository } from 'src/auth/profile.repository';
import { ProfileService } from 'src/auth/services/profile.service';
import { ProfileGuard } from 'src/auth/profile.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    AuthGuard,
    FirebaseService,
    ProfileGuard,
  ],
  exports: [AuthGuard, ProfileGuard],
})
export class AuthModule {}
