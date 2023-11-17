import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import {
  ActivityResponse,
  ActivityResponseResultType,
} from 'src/lms-progress/entities/activity-response.entity';
import {
  LessonResponse,
  LessonResponseStatus,
} from 'src/lms-progress/entities/lesson-response.entity';
import { UnitResponse } from 'src/lms-progress/entities/unit-response.entity';
import {
  activityFactory,
  lessonFactory,
  unitFactory,
} from 'src/lms/fixtures/lms.fixtures';
import { listenOnCreateForFixture } from 'test/utils/fixtures';

export const activityResponseFactory = Factory.define<ActivityResponse>(
  ({ params, onCreate }) => {
    listenOnCreateForFixture({
      onCreate,
      relationships: {
        activityId: activityFactory,
        profileId: profileFactory,
      },
      Schema: ActivityResponse,
    });

    return {
      ...baseFactory.build(params),
      activity: undefined,
      activityId: undefined,
      profileId: undefined,
      lessonResponseId: undefined,
      lessonResponse: undefined,
      result: ActivityResponseResultType.SUCCESS,
      responseData: {},
      timeTaken: faker.number.float({ max: 100, min: 0 }),
      profile: undefined,
    };
  },
);

export const lessonResponseFactory = Factory.define<LessonResponse>(
  ({ params, onCreate }) => {
    listenOnCreateForFixture({
      onCreate,
      relationships: {
        lessonId: lessonFactory,
        profileId: profileFactory,
      },
      Schema: LessonResponse,
    });

    return {
      ...baseFactory.build(params),
      lessonId: undefined,
      lesson: undefined,
      profileId: undefined,
      profile: undefined,
      activityResponses: undefined,
      status: LessonResponseStatus.STARTED,
    };
  },
);

export const unitResponseFactory = Factory.define<UnitResponse>(
  ({ params, onCreate }) => {
    listenOnCreateForFixture({
      onCreate,
      relationships: {
        unitId: unitFactory,
        profileId: profileFactory,
      },
      Schema: UnitResponse,
    });

    return {
      ...baseFactory.build(params),
      unitId: undefined,
      unit: undefined,
      profileId: undefined,
      profile: undefined,
    };
  },
);
