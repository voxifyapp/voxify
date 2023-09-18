import { faker } from '@faker-js/faker';
import { ActivityType } from '@packages/activity-builder';
import { Factory } from 'fishery';
import { omit } from 'lodash';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import { Activity } from 'src/lms/entities/activity.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { listenOnCreateForFixture } from 'test/utils/fixtures';
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
  ({ params, sequence, onCreate }) => {
    listenOnCreateForFixture({
      onCreate,
      relationships: {
        courseId: courseFactory,
      },
      Schema: Unit,
    });

    return {
      ...baseFactory.build(params),
      title: faker.lorem.sentence(5),
      order: sequence,
      course: undefined,
      courseId: undefined,
      lessons: [],
    };
  },
);

export const lessonFactory = Factory.define<Lesson>(
  ({ params, sequence, onCreate }) => {
    onCreate(async (lesson) => {
      const unitRepo = await getRepository(Lesson);
      return unitRepo.save(
        {
          ...omit(lesson, ['activities']),
          unit:
            lesson.unit === undefined
              ? await unitFactory.create()
              : lesson.unit,
        },
        { reload: true },
      );
    });

    return {
      ...baseFactory.build(params),
      title: faker.lorem.sentence(5),
      order: sequence,
      unit: undefined,
      unitId: undefined,
      activities: [],
    };
  },
);

export const activityFactory = Factory.define<Activity>(
  ({ params, sequence, onCreate }) => {
    listenOnCreateForFixture({
      onCreate,
      Schema: Activity,
      relationships: {
        lessonId: lessonFactory,
      },
    });

    return {
      ...baseFactory.build(params),
      title: faker.lorem.sentence(5),
      order: sequence,
      lesson: undefined,
      lessonId: undefined,
      data: {},
      type: ActivityType.FILL_IN_THE_BLANKS,
    };
  },
);
