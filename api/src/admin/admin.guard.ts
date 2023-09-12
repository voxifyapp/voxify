import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { AdminProfileService } from 'src/admin/services/admin-profile.service';
import { DOES_NOT_REQUIRE_PROFILE_KEY } from 'src/common/decorators/auth';

/**
 * Guard that runs globally before all routes.
 * Enforces a user has a profile unless a DOES_NOT_REQUIRE_PROFILE_KEY is set to the route/controller
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private adminProfileService: AdminProfileService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const doesNotRequireProfile = this.reflector.getAllAndOverride<boolean>(
      DOES_NOT_REQUIRE_PROFILE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const decodedUser: DecodedIdToken = request['decodedFirebaseUser'];

    // Get profile for the user
    const profile = await this.adminProfileService.findProfileForUser(
      decodedUser.uid,
    );
    request['currentProfile'] = profile;
    if (!profile && !doesNotRequireProfile) {
      throw new AdminProfileDoesNotExistError();
    }

    return true;
  }
}

export class AdminProfileDoesNotExistError extends UnauthorizedException {
  constructor() {
    super({ type: 'admin_profile_does_not_exist' });
  }
}
