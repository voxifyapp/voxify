import { adminProfileFactory } from 'src/admin/fixtures/admin-profile.fixture';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { courseFactory } from 'src/lms/fixtures/lms.fixtures';
import * as request from 'supertest';
import { loginAsFirebaseUser } from 'test/utils/firebase';

describe('/admin', () => {
  describe('/courses (GET)', () => {
    it('should not be callable if user has no admin profile', async () => {
      const profile = await profileFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get('/admin/courses'),
        { uid: profile.userId },
      );

      expect(res.body).not.toBeNull();
      expect(res.statusCode).toBe(401);
    });

    it('should return all courses if admin profile', async () => {
      const profile = await adminProfileFactory.create();
      const courses = await courseFactory.createList(4);

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get('/admin/courses'),
        { uid: profile.userId },
      );

      expect(res.body).not.toBeNull();
      expect(res.body.length).toEqual(courses.length);
    });
  });
});
