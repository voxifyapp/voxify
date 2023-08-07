import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { courseFactory } from 'src/lms/fixtures/lms.fixtures';
import * as request from 'supertest';
import { loginAsFirebaseUser } from 'test/utils/firebase';

describe('/lms-progress', () => {
  describe('/enroll-to-course/ (POST)', () => {
    it('throws a 401 without auth', () => {
      return request(global.app.getHttpServer()).post('/profile/').expect(401);
    });

    it('enrolls a user to a course', async () => {
      const profile = await profileFactory.create();
      const course = await courseFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/lms-progress/enroll-to-course/')
          .send({ courseId: course.id }),
        { uid: profile.userId },
      );

      expect(res.status).toBe(200);
      expect(res.body.courseId).toBe(course.id);
      expect(res.body.profileId).toBe(profile.id);
    });
  });
});
