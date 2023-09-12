import * as admin from 'firebase-admin';
import { getToken } from 'next-auth/jwt';
import { headers, cookies } from 'next/headers';

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY!;
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseProjectId,
      clientEmail: firebaseClientEmail,
      privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
    }),
  });
}

export default admin;

export const getFirebaseTokenForRequest = async (): Promise<
  string | undefined
> => {
  const token = await getToken({
    req: { headers: headers(), cookies: cookies() } as any,
  });

  return token?.firebaseIdToken as string | undefined;
};
