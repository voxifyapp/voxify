import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';
import axios from 'axios';
import {
  createIdTokenForFirebaseUser,
  createTestFirebaseUser,
} from '../../../test/common/firebase';
import { before } from 'node:test';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseService],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
    console.log(
      await createIdTokenForFirebaseUser(
        service.admin,
        (
          await createTestFirebaseUser(service.admin)
        ).uid,
      ),
    );
  });

  it('should be defined', () => {
    expect(true).toBe(true);
  });
});
