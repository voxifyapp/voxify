import { updateProfileDtoSchema } from '@/src/auth/dto/update-profile.dto';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { MAX_FREE_TRIAL_DAYS } from 'src/common/constants/auth';
import * as request from 'supertest';
import { loginAsFirebaseUser } from 'test/utils/firebase';
import { z } from 'zod';

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

      expect(res.status).toBe(200);
      expect(res.body.userId).toBe(user.uid);
      // Checking if the entire object is being returned
      expect(res.body.createdAt).toBeDefined();
    });

    it('returns an existing profile if one already exists', async () => {
      const profile = await profileFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).post('/profile/'),
        { uid: profile.userId },
      );

      expect(res.status).toBe(200);
      expect(res.body.userId).toBe(profile.userId);
      expect(res.body.id).toBe(profile.id);
    });
  });

  describe('/ (GET)', () => {
    it('throws a 401 without auth', () => {
      return request(global.app.getHttpServer()).get('/profile/').expect(401);
    });

    it("returns the current user's profile", async () => {
      const profile = await profileFactory.create();

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer()).get('/profile/'),
        { uid: profile.userId },
      );

      expect(res.status).toBe(200);
      expect(res.body.userId).toBe(profile.userId);
      expect(res.body.id).toBe(profile.id);
    });
  });

  describe('/ (PATCH)', () => {
    it('updates name and email', async () => {
      const profile = await profileFactory.create({
        fullName: 'John Doe',
        email: 'john@does.com',
      });

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .patch('/profile/')
          .send({ email: 'new@email.com', fullName: 'New' } as z.infer<
            typeof updateProfileDtoSchema
          >),
        { uid: profile.userId },
      );

      expect(res.status).toBe(200);
      expect(res.body.userId).toBe(profile.userId);
      expect(res.body.id).toBe(profile.id);
      expect(res.body.fullName).toBe('New');
      expect(res.body.email).toBe('new@email.com');
    });
  });

  describe('/add-days-to-subscription (POST)', () => {
    it('throws a 401 without auth', () => {
      return request(global.app.getHttpServer())
        .post('/profile/add-days-to-subscription')
        .expect(401);
    });

    it('adds days to subscription', async () => {
      const profile = await profileFactory.create({
        subscriptionEndDate: null,
      });
      const daysToAdd = 7;

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/profile/add-days-to-subscription')
          .send({ freeTrialDays: daysToAdd }),
        { uid: profile.userId },
      );

      expect(res.status).toBe(201);
      expect(res.body.userId).toBe(profile.userId);
      expect(res.body.id).toBe(profile.id);
      expect(res.body.subscriptionEndDate).toBeDefined();
    });

    it('if subscriptionEndDate already exists, throws bad request', async () => {
      const profile = await profileFactory.create();
      const daysToAdd = 7;

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/profile/add-days-to-subscription')
          .send({ freeTrialDays: daysToAdd }),
        { uid: profile.userId },
      );

      expect(res.status).toBe(400);
    });

    it('cannot pass more than MAX_FREE_TRIAL_DAYS', async () => {
      const profile = await profileFactory.create();
      const daysToAdd = MAX_FREE_TRIAL_DAYS + 1;

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/profile/add-days-to-subscription')
          .send({ freeTrialDays: daysToAdd }),
        { uid: profile.userId },
      );

      expect(res.status).toBe(400);
    });
  });

  describe('/set-proficiency-level (POST)', () => {
    it('throws a 401 without auth', () => {
      return request(global.app.getHttpServer())
        .post('/profile/set-proficiency-level')
        .expect(401);
    });

    it('sets proficiency level', async () => {
      const profile = await profileFactory.create({
        proficiencyLevel: null,
      });
      const proficiencyLevel = ProficiencyLevel.ADVANCED;

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/profile/set-proficiency-level')
          .send({ proficiencyLevel }),
        { uid: profile.userId },
      );

      expect(res.status).toBe(201);
      expect(res.body.userId).toBe(profile.userId);
      expect(res.body.id).toBe(profile.id);
      expect(res.body.proficiencyLevel).toBe(proficiencyLevel);
    });

    it('if proficiencyLevel already exists, throws bad request', async () => {
      const profile = await profileFactory.create();
      const proficiencyLevel = ProficiencyLevel.ADVANCED;

      const res = await loginAsFirebaseUser(
        request(global.app.getHttpServer())
          .post('/profile/set-proficiency-level')
          .send({ proficiencyLevel }),
        { uid: profile.userId },
      );

      expect(res.status).toBe(400);
    });
  });
});
