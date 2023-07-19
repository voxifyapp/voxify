import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

/**
 * We will be using within auth module to initialize firebase app and for authentication
 * If we use more Firebase services it would be better to make this into a module and rewrite the
 * authentication into a separate service inside this module.
 */
@Injectable()
export class FirebaseService {
  public admin: admin.app.App;

  constructor() {
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
    const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
    const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (admin.apps.length === 0) {
      this.admin = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: firebaseProjectId,
          clientEmail: firebaseClientEmail,
          privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      this.admin = admin.app();
    }
  }

  async getFirebaseUserFromIdToken(idToken: string) {
    return await this.admin.auth().verifyIdToken(idToken);
  }
}
