import { BadRequestException, Injectable } from '@nestjs/common';
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
      id: courseId || '',
    });

    const existingEnrollment = await this.courseEnrollmentRepository.findOneBy({
      profileId: profile.id,
    });

    if (existingEnrollment) {
      throw new EnrollmentExistsError();
    }

    const courseEnrollment =
      await this.courseEnrollmentRepository.enrollToCourse(
        profile.id,
        course.id,
      );

    return courseEnrollment;
  }
}

export class EnrollmentExistsError extends BadRequestException {
  constructor() {
    super({ code: 'enrollment_exists', message: 'Enrollment already exists' });
  }
}
