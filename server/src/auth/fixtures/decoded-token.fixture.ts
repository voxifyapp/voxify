import { faker } from '@faker-js/faker';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Factory } from 'fishery';
import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';

export const decodedTokenFactory = Factory.define<DecodedIdToken>(({}) => {
  return {
    uid: firebaseUserFactory.build().uid,
    email: faker.internet.email(),
  } as any;
});
