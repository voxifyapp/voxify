import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import { Course } from 'src/lms/entities/course.entity';

export const courseFactory = Factory.define<Course>(({ params }) => {
  //   onCreate(async (profile) => {
  //     const profileRepo = await getRepository(Profile);
  //     return profileRepo.save(
  //       {
  //         ...profile,
  //         userId: profile.userId
  //           ? profile.userId
  //           : (await firebaseUserFactory.create()).uid,
  //       },
  //       { reload: true },
  //     );
  //   });

  return {
    ...baseFactory.build(params),
    proficiencyLevel: ProficiencyLevel.MEDIUM,
    title: faker.lorem.sentence(5),
    // TODO Need to add factory here for units
    units: [],
  };
});
