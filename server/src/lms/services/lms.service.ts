import { Injectable } from '@nestjs/common';
import { CourseRepository } from 'src/lms/repositories/lms.repository';

@Injectable()
export class LmsService {
  constructor(private courseRepository: CourseRepository) {}

  /**
   * Get all courses
   */
  async getCourses() {
    return await this.courseRepository.find();
  }

  async getCourseById(courseId: string) {
    return await this.courseRepository.findOneBy({ id: courseId });
  }
}
