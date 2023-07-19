import { Test, TestingModule } from '@nestjs/testing';
import {
  createIdTokenForFirebaseUser,
  createTestFirebaseUser,
} from '../../../test/common/firebase';
import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseService],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it('should be able to verify a valid idtoken', async () => {
    const firebaseUser = await createTestFirebaseUser(service.admin);
    const idToken = await createIdTokenForFirebaseUser(
      service.admin,
      firebaseUser.uid,
    );

    const result = await service.getFirebaseUserFromIdToken(idToken);

    expect(result.uid).toEqual(firebaseUser.uid);
  });

  it('should throw an error if idtoken is invalid', async () => {
    let error;
    try {
      await service.getFirebaseUserFromIdToken('fakeIdTokenThatDoesNotExist');
    } catch (err) {
      error = err;
    }

    console.log(error);

    expect(error).not.toBeNull();
  });
});
