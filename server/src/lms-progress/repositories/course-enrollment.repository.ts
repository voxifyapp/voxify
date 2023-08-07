import { Injectable } from '@nestjs/common';
import { CourseEnrollment } from 'src/lms-progress/entities/course-enrollment.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CourseEnrollmentRepository extends Repository<CourseEnrollment> {
  constructor(private dataSource: DataSource) {
    super(CourseEnrollment, dataSource.createEntityManager());
  }

  async enrollToCourse(profileId: string, courseId: string) {
    const courseEnrollment = new CourseEnrollment();
    courseEnrollment.courseId = courseId;
    courseEnrollment.profileId = profileId;
    return this.save(courseEnrollment, { reload: true });
  }
}
