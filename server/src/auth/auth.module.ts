import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  providers: [FirebaseService],
  imports: [ProfileModule],
})
export class AuthModule {}
