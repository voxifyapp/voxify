import { faker } from '@faker-js/faker';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Factory } from 'fishery';

export const firebaseUserFactory = Factory.define<DecodedIdToken>(({}) => {
  return {
    uid: faker.string.alpha(),
    email: faker.internet.email(),
  } as any;
});
