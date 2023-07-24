import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FirebaseService } from 'src/auth/services/firebase.service';

/**
 * Runs globally on all routes, get a decoded token from the request header
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtToken = this.extractTokenFromHeader(request);

    if (!jwtToken) {
      throw new UnauthorizedException();
    }

    try {
      const decodedIdToken =
        await this.firebaseService.getFirebaseUserFromIdToken(jwtToken);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['decodedFirebaseUser'] = decodedIdToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
