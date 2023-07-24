import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { ProficiencyLevel, Profile } from 'src/auth/entities/profile.entity';
import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
import { getRepository } from 'test/utils/typeorm';

export const profileFactory = Factory.define<Profile>(
  ({ sequence, onCreate }) => {
    onCreate(async (profile) => {
      const profileRepo = await getRepository(Profile);
      return profileRepo.save(
        {
          ...profile,
          userId: profile.userId
            ? profile.userId
            : (await firebaseUserFactory.create()).uid,
        },
        { reload: true },
      );
    });

    return {
      createdAt: faker.date.past(),
      id: sequence,
      proficiencyLevel: ProficiencyLevel.MEDIUM,
      subscriptionEndDate: faker.date.future(),
      updatedAt: faker.date.past(),
      userId: null,
      version: 1,
    };
  },
);
