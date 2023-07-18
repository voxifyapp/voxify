import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  providers: [AuthService, FirebaseService],
})
export class AuthModule {}
