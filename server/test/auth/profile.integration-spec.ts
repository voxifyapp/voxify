import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import * as request from 'supertest';
import { loginAsFirebaseUser } from 'test/utils/firebase';

describe('/profile', () => {
  describe('/ (POST)', () => {
    it('throws a 401 without auth', () => {
      return request(global.app.getHttpServer()).post('/profile/').expect(401);
    });

    it('creates a profile', async () => {
      const user = await firebaseUserFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).post('/profile/'),
        { uid: user.uid },
      );

      expect(res.status).toBe(200);
      expect(res.body.userId).toBe(user.uid);
      // Checking if the entire object is being returned
      expect(res.body.createdAt).toBeDefined();
    });

    it('returns an existing profile if one already exists', async () => {
      const profile = await profileFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).post('/profile/'),
        { uid: profile.userId },
      );

      expect(res.status).toBe(200);
      expect(res.body.userId).toBe(profile.userId);
      expect(res.body.id).toBe(profile.id);
    });
  });

  describe('/ (GET)', () => {
    it('throws a 401 without auth', () => {
      return request(global.app.getHttpServer()).get('/profile/').expect(401);
    });

    it('returns the profile', async () => {
      const profile = await profileFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get('/profile/'),
        { uid: profile.userId },
      );

      expect(res.status).toBe(200);
      expect(res.body.userId).toBe(profile.userId);
      expect(res.body.id).toBe(profile.id);
    });
  });
});
