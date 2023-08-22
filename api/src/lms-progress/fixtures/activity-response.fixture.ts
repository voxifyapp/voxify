import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import {
  ActivityResponse,
  ResultType,
} from 'src/lms-progress/entities/activity-response.entity';

export const activityResponseFactory = Factory.define<ActivityResponse>(
  ({ params }) => {
    // onCreate(async (activity) => {
    //   const activityRepo = await getRepository(Activity);
    //   return activityRepo.save(
    //     {
    //       ...omit(activity, []),
    //       lesson:
    //         activity.lesson === undefined
    //           ? await lessonFactory.create()
    //           : activity.lesson,
    //     },
    //     { reload: true },
    //   );
    // });

    return {
      ...baseFactory.build(params),
      activity: undefined,
      activityId: undefined,
      profileId: undefined,
      result: ResultType.SUCCESS,
      responseData: {},
      timeTaken: faker.number.float({ max: 100, min: 0 }),
      profile: undefined,
    };
  },
);
