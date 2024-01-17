import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { ProficiencyLevel, Profile } from 'src/auth/entities/profile.entity';
import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import { getRepository } from 'test/utils/typeorm';

export const profileFactory = Factory.define<Profile>(({ onCreate }) => {
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
    ...baseFactory.build(),
    proficiencyLevel: ProficiencyLevel.MEDIUM,
    subscriptionEndDate: faker.date.future(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    userId: null,
  };
});
