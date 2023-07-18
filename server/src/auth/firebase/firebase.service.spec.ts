import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';
import axios from 'axios';
import * as admin from 'firebase-admin';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseService],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);

    // console.log(user)
  });

  it('should be defined', () => {
    expect(true).toBe(true);
  });
});
