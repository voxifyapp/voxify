import { Injectable } from '@nestjs/common';
import {
  CourseRepository,
  UnitRepository,
} from 'src/lms/repositories/lms.repository';

@Injectable()
export class LmsService {
  constructor(
    private courseRepository: CourseRepository,
    private unitRepository: UnitRepository,
  ) {}

  /**
   * Get all courses
   */
  async getCourses() {
    return await this.courseRepository.find();
  }

  async getCourseById(courseId: string) {
    return await this.courseRepository.findOneBy({ id: courseId });
  }

  async getUnitById(unitId: string) {
    return await this.unitRepository.findOneBy({ id: unitId });
  }

  async getUnitsForCourse(courseId: string) {
    return await this.unitRepository.listUnitsForCourse(courseId);
  }
}
