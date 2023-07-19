import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FirebaseService } from 'src/auth/firebase/firebase.service';

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
      const firebaseUser =
        await this.firebaseService.getFirebaseUserFromIdToken(jwtToken);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['firebaseUser'] = firebaseUser;
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
