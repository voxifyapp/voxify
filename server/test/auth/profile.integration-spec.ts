import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
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
    });
  });
});
