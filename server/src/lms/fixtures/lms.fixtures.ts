import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { omit } from 'lodash';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import { Activity, ActivityType } from 'src/lms/entities/activity.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { getRepository } from 'test/utils/typeorm';

export const courseFactory = Factory.define<Course>(({ params, onCreate }) => {
  onCreate(async (course) => {
    const courseRepo = await getRepository(Course);
    return courseRepo.save(
      {
        ...omit(course, ['units']),
      },
      { reload: true },
    );
  });

  return {
    ...baseFactory.build(params),
    proficiencyLevel: ProficiencyLevel.MEDIUM,
    title: faker.lorem.sentence(5),
    units: [],
  };
});

export const unitFactory = Factory.define<Unit>(
  ({ params, sequence, associations }) => {
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
      course: associations.course || courseFactory.build(),
      lessons: [],
    };
  },
);

export const lessonFactory = Factory.define<Lesson>(
  ({ params, sequence, associations }) => {
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
      unit: associations.unit || unitFactory.build(),
      activities: [],
    } as Lesson;
  },
);

export const activityFactory = Factory.define<Activity>(
  ({ params, sequence, associations }) => {
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
      lesson: associations.lesson || lessonFactory.build(),
      data: {},
      type: ActivityType.FILL_IN_THE_BLANKS,
    };
  },
);
