import { Factory } from 'fishery';
import { baseFactory } from 'src/common/fixtures/base.fixture';
import { CourseEnrollment } from 'src/lms-progress/entities/course-enrollment.entity';

export const courseEnrollmentFactory = Factory.define<CourseEnrollment>(
  ({}) => {
    return {
      ...baseFactory.build(),
      course: undefined,
      profile: undefined,
    } as CourseEnrollment;
  },
);
