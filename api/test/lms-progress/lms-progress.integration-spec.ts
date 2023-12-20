import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import {
  CreateLessonResponseDto,
  CreateUnitResponseDto,
} from 'src/lms-progress/dtos/lms-progress.dto';
import { LessonResponseStatus } from 'src/lms-progress/entities/lesson-response.entity';
import {
  lessonResponseFactory,
  unitResponseFactory,
} from 'src/lms-progress/fixtures/lms-progress.fixture';
import { lessonFactory, unitFactory } from 'src/lms/fixtures/lms.fixtures';
import * as request from 'supertest';
import { loginAsFirebaseUser } from 'test/utils/firebase';

describe('/lms-progress', () => {
  describe('/lesson-responses (POST)', () => {
    it('should create a new lesson response', async () => {
      const profile = await profileFactory.create();
      const lesson = await lessonFactory.create();

      const data: CreateLessonResponseDto = {
        lessonId: lesson.id,
        status: LessonResponseStatus.STARTED,
      };

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/lms-progress/lesson-responses')
          .send(data),
        { uid: profile.userId },
      );

      expect(res.body.lessonId).toBe(lesson.id);
      expect(res.body.profileId).toBe(profile.id);
    });
  });

  describe('/unit-responses (POST)', () => {
    it('should create a new unit response', async () => {
      const profile = await profileFactory.create();
      const unit = await unitFactory.create();

      const data: CreateUnitResponseDto = {
        unitId: unit.id,
      };

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/lms-progress/unit-responses')
          .send(data),
        { uid: profile.userId },
      );

      expect(res.body.unitId).toBe(unit.id);
      expect(res.body.profileId).toBe(profile.id);
    });
  });

  // /unit-responses (GET)
  describe('/unit-responses (GET)', () => {
    it('should return a list of unit responses for profile', async () => {
      const profile = await profileFactory.create();
      const unit = await unitFactory.create();

      const unitResponsesForUnit = await unitResponseFactory.createList(3, {
        unitId: unit.id,
        profileId: profile.id,
      });

      // Other unit responses for unrelated units
      await unitResponseFactory.createList(3, {
        unitId: (await unitFactory.create()).id,
        profileId: profile.id,
      });

      // Other unit responses (for other users)
      await unitResponseFactory.createList(3, {
        unitId: unit.id,
      });

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .get('/lms-progress/unit-responses')
          .query({
            forUnitId: unit.id,
          }),
        { uid: profile.userId },
      );

      expect(res.body.length).toBe(unitResponsesForUnit.length);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            profileId: profile.id,
          }),
        ]),
      );
    });
  });
  // /lesson-responses (GET)
  describe('/lesson-responses (GET)', () => {
    it('should return a list of lesson responses for profile', async () => {
      const profile = await profileFactory.create();
      const lesson = await lessonFactory.create();

      const lessonResponsesForLesson = await lessonResponseFactory.createList(
        3,
        {
          lessonId: lesson.id,
          profileId: profile.id,
        },
      );

      // Other lesson responses for unrelated lessons
      await lessonResponseFactory.createList(3, {
        lessonId: (await lessonFactory.create()).id,
        profileId: profile.id,
      });

      // Other lesson responses (for other users)
      await lessonResponseFactory.createList(3, {
        lessonId: lesson.id,
      });

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .get('/lms-progress/lesson-responses')
          .query({
            forLessonId: lesson.id,
          }),
        { uid: profile.userId },
      );

      expect(res.body.length).toBe(lessonResponsesForLesson.length);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            profileId: profile.id,
          }),
        ]),
      );
    });
  });
});
