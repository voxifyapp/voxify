import { Test } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';

jest.mock('firebase-admin', () => {
  return {
    apps: [],
    initializeApp: jest.fn().mockReturnValue({
      auth: jest.fn().mockReturnValue({
        verifyIdToken: jest.fn(),
      }),
    }),
    app: jest.fn().mockReturnValue({
      auth: jest.fn().mockReturnValue({
        verifyIdToken: jest.fn(),
      }),
    }),
    credential: {
      cert: jest.fn(),
    },
  };
});

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [FirebaseService],
    }).compile();

    service = moduleRef.get<FirebaseService>(FirebaseService);
  });

  it('should verify ID token if valid and return user', async () => {
    expect(true).toBe(true);
    const idToken = 'valid_token';
    const mockUser = { uid: 'test_uid' };

    service.admin.auth().verifyIdToken = jest
      .fn()
      .mockReturnValueOnce(mockUser);

    const result = await service.getFirebaseUserFromIdToken(idToken);
    expect(result.uid).toEqual(mockUser.uid);
    expect(service.admin.auth().verifyIdToken).toHaveBeenCalledWith(idToken);
  });

  it('should throw an error if idtoken is invalid', async () => {
    const invalidToken = 'fakeIdTokenThatDoesNotExist';
    service.admin.auth().verifyIdToken = jest
      .fn()
      .mockImplementationOnce(async () => {
        throw new Error();
      });

    let error;
    try {
      await service.getFirebaseUserFromIdToken(invalidToken);
    } catch (err) {
      error = err;
    }

    expect(error).not.toBeNull();
    expect(service.admin.auth().verifyIdToken).toHaveBeenCalledWith(
      invalidToken,
    );
  });
});
