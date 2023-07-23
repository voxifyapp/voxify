import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
import { ProficiencyLevel, Profile } from 'src/auth/entities/profile.entity';

export const profileFactory = Factory.define<Profile>(
  ({ sequence, onCreate }) => {
    onCreate((profile) => {
      console.log(profile);
      return profile;
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
