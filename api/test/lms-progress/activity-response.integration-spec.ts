import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { ResultType } from 'src/lms-progress/entities/activity-response.entity';
import { activityResponseFactory } from 'src/lms-progress/fixtures/lms-progress.fixture';
import { activityFactory } from 'src/lms/fixtures/lms.fixtures';
import * as request from 'supertest';
import { loginAsFirebaseUser } from 'test/utils/firebase';

describe('/lms-progress', () => {
  describe('/activity-responses (POST)', () => {
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

  describe('/activity-responses (GET)', () => {
    let profile;
    let activityResponsesForProfile;

    beforeEach(async () => {
      profile = await profileFactory.create();

      activityResponsesForProfile = await activityResponseFactory.createList(
        3,
        {
          profileId: profile.id,
        },
      );

      // For another profile
      await activityResponseFactory.createList(3, {
        activity: activityResponsesForProfile[0].activityId,
      });
    });

    it('should return all activity responses for a profile', async () => {
      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get(
          '/lms-progress/activity-responses',
        ),
        { uid: profile.userId },
      );

      expect(res.body).not.toBeNull();
      expect(res.body.length).toBe(activityResponsesForProfile.length);
    });

    it('should return all activity responses for a profile for a particular activity', async () => {
      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .get('/lms-progress/activity-responses')
          .query({
            forActivityId: activityResponsesForProfile[0].activityId,
          }),
        { uid: profile.userId },
      );

      expect(res.body.length).toBe(1);
    });
  });
});
