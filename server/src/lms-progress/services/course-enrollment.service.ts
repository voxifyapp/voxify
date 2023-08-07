import { Injectable } from '@nestjs/common';
import { Profile } from 'src/auth/entities/profile.entity';
import { CourseEnrollmentRepository } from 'src/lms-progress/repositories/course-enrollment.repository';
import { CourseRepository } from 'src/lms/repositories/lms.repository';

@Injectable()
export class CourseEnrollmentService {
  constructor(
    private courseEnrollmentRepository: CourseEnrollmentRepository,
    private courseRepository: CourseRepository,
  ) {}

  async enrollToCourse(profile: Profile, courseId: string) {
    const course = await this.courseRepository.findOneByOrFail({
      id: courseId,
    });

    const courseEnrollment =
      await this.courseEnrollmentRepository.enrollToCourse(
        profile.id,
        course.id,
      );

    return courseEnrollment;
  }
}
