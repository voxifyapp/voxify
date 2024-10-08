import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { FirebaseService } from 'src/auth/services/firebase.service';
import { IS_PUBLIC_KEY } from 'src/common/decorators/auth';

/**
 * Guard that runs globally before all routes.
 * Enforces a user is authenticated to access a route, unless the route is marked as Public.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    // Get the user from the request header
    const jwtToken = this.extractTokenFromHeader(request);
    if (!jwtToken && !isPublic) {
      throw new UnauthorizedException();
    }

    let decodedUser: DecodedIdToken;
    try {
      decodedUser = await this.firebaseService.getFirebaseUserFromIdToken(
        jwtToken,
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['decodedFirebaseUser'] = decodedUser;
    } catch (e) {
      if (!isPublic) {
        throw new UnauthorizedException();
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export class ProfileDoesNotExistError extends UnauthorizedException {
  constructor() {
    super({ type: 'profile_does_not_exist' });
  }
}
