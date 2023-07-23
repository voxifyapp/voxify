import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { FirebaseService } from './services/firebase.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let firebaseService: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: FirebaseService,
          useValue: {
            getFirebaseUserFromIdToken: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if the token is valid', async () => {
    jest
      .spyOn(firebaseService, 'getFirebaseUserFromIdToken')
      .mockResolvedValueOnce({} as any);
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer valid_token',
          },
        }),
      }),
    } as ExecutionContext;

    await expect(guard.canActivate(context)).resolves.toBeTruthy();
  });

  it('should throw an UnauthorizedException if the token is invalid', async () => {
    jest
      .spyOn(firebaseService, 'getFirebaseUserFromIdToken')
      .mockRejectedValueOnce(new Error());
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid_token',
          },
        }),
      }),
    } as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrowError();
  });

  it('should throw an UnauthorizedException if the token is not provided', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as ExecutionContext;

    await expect(guard.canActivate(context)).rejects.toThrowError();
  });
});
