import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { Course } from 'src/lms/entities/course.entity';
import { courseFactory, unitFactory } from 'src/lms/fixtures/lms.fixtures';
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

  describe('/course/:courseId (GET)', () => {
    it('returns a course by id', async () => {
      const profile = await profileFactory.create();
      const course = await courseFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(`/lms/courses/${course.id}`),
        { uid: profile.userId },
      );

      expect(res.body.id).toEqual(course.id);
    });
  });

  describe('/course/:courseId/units (GET)', () => {
    it('returns a list of units for a course', async () => {
      const profile = await profileFactory.create();
      const course = await courseFactory.create();
      const units = await unitFactory.createList(2, { course });

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(
          `/lms/courses/${course.id}/units`,
        ),
        { uid: profile.userId },
      );

      expect(res.body.length).toEqual(units.length);
    });
  });
});
