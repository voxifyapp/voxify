import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { Course } from 'src/lms/entities/course.entity';
import { courseFactory } from 'src/lms/fixtures/lms.fixtures';
import * as request from 'supertest';
import { loginAsFirebaseUser } from 'test/utils/firebase';
import { getRepository } from 'test/utils/typeorm';

describe('/lms', () => {
  describe('/course (GET)', () => {
    it('throws a 401 without auth', () => {
      return request(global.app.getHttpServer())
        .get('/lms/courses')
        .expect(401);
    });

    it('returns a list of courses without soft deletes', async () => {
      const profile = await profileFactory.create();
      const courses = await courseFactory.createList(2);

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get('/lms/courses'),
        { uid: profile.userId },
      );

      expect(res.body.length).toEqual(courses.length);

      const courseRepo = await getRepository(Course);
      const course = courses[0];
      await courseRepo.softDelete(course.id);

      const res2 = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get('/lms/courses'),
        { uid: profile.userId },
      );

      expect(res2.body.length).toEqual(courses.length - 1);
    });
  });
});
