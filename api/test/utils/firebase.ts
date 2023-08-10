import axios from 'axios';
import * as admin from 'firebase-admin';
import { Test } from 'supertest';

/**
 * Attaches authorization hears to request
 */
export const loginAsFirebaseUser = async (
  request: Test,
  {
    uid,
    token,
  }: {
    uid?: string;
    /**
     * Want to login with a token
     */
    token?: string;
  } = {},
) => {
  const customToken = token || (await createIdTokenForFirebaseUser(uid));

  return request.set('Authorization', `Bearer ${customToken}`);
};

/**
 * Create id token for a firebase user uid
 */
export const createIdTokenForFirebaseUser = async (uid: string) => {
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
