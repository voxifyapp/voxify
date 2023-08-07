import { Test, TestingModule } from '@nestjs/testing';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { mockService } from 'src/common/mocks/mockService';
import { AuthenticatedRequestWithProfile } from 'src/common/request';
import { CourseEnrollmentController } from 'src/lms-progress/controllers/course-enrollment.controller';
import { EnrollToCourseDto } from 'src/lms-progress/dto/enroll-to-course-dto';
import { courseEnrollmentFactory } from 'src/lms-progress/fixtures/course-enrollment.fixture';
import { CourseEnrollmentService } from 'src/lms-progress/services/course-enrollment.service';
import { courseFactory } from 'src/lms/fixtures/lms.fixtures';

describe('ProfileController', () => {
  let controller: CourseEnrollmentController;
  let courseEnrollmentService: CourseEnrollmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseEnrollmentController],
      providers: [mockService(CourseEnrollmentService)],
    }).compile();

    controller = module.get<CourseEnrollmentController>(
      CourseEnrollmentController,
    );
    courseEnrollmentService = module.get<CourseEnrollmentService>(
      CourseEnrollmentService,
    );
  });

  describe('enrollToCourse', () => {
    it('should enroll the user to the course', async () => {
      const course = courseFactory.build();
      const currentProfile = profileFactory.build();

      const enrollToCourseDto: EnrollToCourseDto = {
        courseId: course.id,
      };

      const courseEnrollment = courseEnrollmentFactory.build({
        course,
        profile: currentProfile,
      });

      courseEnrollmentService.enrollToCourse = jest
        .fn()
        .mockResolvedValue(courseEnrollment);

      const result = await controller.enrollToCourse(enrollToCourseDto, {
        currentProfile,
      } as any as AuthenticatedRequestWithProfile);

      expect(result).toBe(courseEnrollment);
      expect(courseEnrollmentService.enrollToCourse).toHaveBeenCalledWith(
        currentProfile,
        enrollToCourseDto.courseId,
      );
    });
  });
});
