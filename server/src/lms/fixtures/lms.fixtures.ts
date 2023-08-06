import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import { Course } from 'src/lms/entities/course.entity';
import { Unit } from 'src/lms/entities/unit.entity';

export const unitFactory = Factory.define<Unit>(({ params, sequence }) => {
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
    title: faker.lorem.sentence(5),
    order: sequence,
    course: courseFactory.build(),
    lessons: [],
  };
});

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
    units: [],
  };
});
