import { Test, TestingModule } from '@nestjs/testing';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import { mockRepository } from 'src/common/mocks/mockedRepository';
import { courseEnrollmentFactory } from 'src/lms-progress/fixtures/course-enrollment.fixture';
import { CourseEnrollmentRepository } from 'src/lms-progress/repositories/course-enrollment.repository';
import { courseFactory } from 'src/lms/fixtures/lms.fixtures';
import { CourseRepository } from 'src/lms/repositories/lms.repository';
import { CourseEnrollmentService } from './course-enrollment.service';

describe('CourseEnrollmentService', () => {
  let service: CourseEnrollmentService;
  let courseEnrollmentRepository: CourseEnrollmentRepository;
  let courseRepository: CourseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseEnrollmentService,
        mockRepository(CourseEnrollmentRepository),
        mockRepository(CourseRepository),
      ],
    }).compile();

    service = module.get<CourseEnrollmentService>(CourseEnrollmentService);
    courseEnrollmentRepository = module.get<CourseEnrollmentRepository>(
      CourseEnrollmentRepository,
    );
    courseRepository = module.get<CourseRepository>(CourseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('enrollToCourse', () => {
    it('should enroll to course', async () => {
      const profile = profileFactory.build();
      const course = courseFactory.build();

      const courseEnrollment = courseEnrollmentFactory.build({
        profile,
        course,
      });

      courseRepository.findOneByOrFail = jest.fn().mockReturnValue(course);
      courseEnrollmentRepository.enrollToCourse = jest
        .fn()
        .mockResolvedValueOnce(courseEnrollment);

      const result = await service.enrollToCourse(profile, course.id);

      expect(result).toEqual(courseEnrollment);
      expect(courseRepository.findOneByOrFail).toBeCalledWith({
        id: course.id,
      });
      expect(courseEnrollmentRepository.enrollToCourse).toBeCalledWith(
        profile.id,
        course.id,
      );
    });
  });
});
