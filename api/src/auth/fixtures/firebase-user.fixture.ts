import { faker } from '@faker-js/faker';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { Factory } from 'fishery';

export const firebaseUserFactory = Factory.define<UserRecord>(
  ({ onCreate }) => {
    onCreate(async (user) => {
      const createdUser = await admin.auth().createUser(user as any);
      return createdUser;
    });

    return {
      uid: faker.string.uuid(),
      email: faker.internet.email(),
      aud: faker.string.uuid(),
      auth_time: faker.date.past().getTime(),
      exp: faker.date.future().getTime(),
    } as unknown as UserRecord;
  },
);
