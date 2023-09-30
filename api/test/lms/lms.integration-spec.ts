/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProficiencyLevel, Profile } from 'src/auth/entities/profile.entity';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { Course } from 'src/lms/entities/course.entity';
import {
  activityFactory,
  courseFactory,
  lessonFactory,
  unitFactory,
} from 'src/lms/fixtures/lms.fixtures';
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
      const units = await unitFactory.createList(2);

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(
          `/lms/courses/${units[0].courseId}/units`,
        ),
        { uid: profile.userId },
      );

      expect(res.body.length).toEqual(units.length);
    });
  });

  describe('/lesson/:lessonId (GET)', () => {
    it('returns a lesson by id', async () => {
      const profile = await profileFactory.create();
      const lesson = await lessonFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(`/lms/lesson/${lesson.id}`),
        { uid: profile.userId },
      );

      expect(res.body.id).toEqual(lesson.id);
    });
  });

  describe('/lesson/:lessonId/activities (GET)', () => {
    it('returns a list of activities for a lesson', async () => {
      const profile = await profileFactory.create();
      const activities = await activityFactory.createList(2, {
        published: true,
      });

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(
          `/lms/lesson/${activities[0].lessonId}/activities`,
        ),
        { uid: profile.userId },
      );

      expect(res.body.length).toEqual(activities.length);
    });

    it('returns only published activities', async () => {
      const profile = await profileFactory.create();
      const activities = await activityFactory.createList(2, {
        published: false,
      });

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(
          `/lms/lesson/${activities[0].lessonId}/activities`,
        ),
        { uid: profile.userId },
      );

      expect(res.body.length).toEqual(0);
    });
  });

  describe('/activities/:activityId (GET)', () => {
    it('returns a activity by id', async () => {
      const profile = await profileFactory.create();
      const activity = await activityFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(
          `/lms/activities/${activity.id}`,
        ),
        { uid: profile.userId },
      );

      expect(res.body.id).toEqual(activity.id);
    });
  });

  describe('/courses/current-course-for-profile (GET)', () => {
    it('returns a course for a profile based on proficiency', async () => {
      const profile = await profileFactory.create({
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      });
      const beginnerCourse = await courseFactory.create({
        proficiencyLevel: ProficiencyLevel.BEGINNER,
      });
      const advancedCourse = await courseFactory.create({
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      });

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(
          `/lms/courses/current-course-for-profile`,
        ),
        { uid: profile.userId },
      );

      expect(res.body.id).toEqual(advancedCourse.id);

      profile.proficiencyLevel = ProficiencyLevel.BEGINNER;
      (await getRepository(Profile)).save(profile);

      const res2 = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(
          `/lms/courses/current-course-for-profile`,
        ),
        { uid: profile.userId },
      );

      expect(res2.body.id).toEqual(beginnerCourse.id);
    });
  });
});
