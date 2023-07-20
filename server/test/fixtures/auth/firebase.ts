import * as admin from 'firebase-admin';
import { faker } from '@faker-js/faker';
import axios from 'axios';

/**
 * Create a test user on firebase [To be used with emulator]
 */
export const createTestFirebaseUser = async (
  admin: admin.app.App,
  { name, email }: { email?: string; name?: string } = {},
) => {
  return await admin.auth().createUser({
    email: email || faker.internet.email(),
    displayName: name || faker.person.fullName(),
  });
};

/**
 * Create id token for a firebase user uid
 */
export const createIdTokenForFirebaseUser = async (
  admin: admin.app.App,
  uid: string,
) => {
  const customToken = await admin.auth().createCustomToken(uid);

  const res = await axios({
    url: `http://127.0.0.1:9099/www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
    method: 'post',
    data: {
      token: customToken,
      returnSecureToken: true,
    },
  });

  return res.data.idToken;
};
