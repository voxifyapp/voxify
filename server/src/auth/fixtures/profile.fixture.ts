import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
import { ProficiencyLevel, Profile } from 'src/auth/entities/profile.entity';
import typeormConfig from 'src/typeorm.config';

export const profileFactory = Factory.define<Profile>(
  ({ sequence, onCreate }) => {
    onCreate(async (profile) => {
      return await (await typeormConfig.initialize())
        .getRepository(Profile)
        .save(profile, { reload: true });
    });

    return {
      createdAt: faker.date.past(),
      id: sequence,
      proficiencyLevel: ProficiencyLevel.MEDIUM,
      subscriptionEndDate: faker.date.future(),
      updatedAt: faker.date.past(),
      userId: firebaseUserFactory.build().uid,
      version: 1,
    };
  },
);
