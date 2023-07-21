import { Request } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Profile } from 'src/auth/profile/profile.entity';

export interface AuthenticatedRequest extends Request {
  firebaseUser: DecodedIdToken;
}

export interface AuthenticatedRequestWithProfile extends AuthenticatedRequest {
  currentProfile: Profile;
}
