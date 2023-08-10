import { Request } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Profile } from 'src/auth/entities/profile.entity';

export interface AuthenticatedRequest extends Request {
  decodedFirebaseUser: DecodedIdToken;
}

export interface AuthenticatedRequestWithProfile extends AuthenticatedRequest {
  currentProfile: Profile;
}
