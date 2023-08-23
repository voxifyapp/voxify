import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import {
  CreateLessonResponseDto,
  CreateUnitResponseDto,
} from 'src/lms-progress/dtos/lms-progress.dto';
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
});
