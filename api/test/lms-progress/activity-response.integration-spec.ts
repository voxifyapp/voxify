import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { activityFactory } from 'src/lms/fixtures/lms.fixtures';
import { loginAsFirebaseUser } from 'test/utils/firebase';
import * as request from 'supertest';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { ResultType } from 'src/lms-progress/entities/activity-response.entity';

describe('/lms-progress', () => {
  describe('/activity-response (POST)', () => {
    it('should create a new activity response', async () => {
      const profile = await profileFactory.create();
      const activity = await activityFactory.create();

      const data: CreateActivityResponseDto = {
        activityId: activity.id,
        responseData: {
          test: 'test',
        },
        timeTaken: 10,
        result: ResultType.SUCCESS,
      };

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/lms-progress/activity-responses')
          .send(data),
        { uid: profile.userId },
      );

      expect(res.body).not.toBeNull();
      expect(res.body.activityId).toBe(activity.id);
    });
  });
});
