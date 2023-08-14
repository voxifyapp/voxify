import { Injectable } from '@nestjs/common';
import { Profile } from 'src/auth/entities/profile.entity';
import {
  ActivityRepository,
  CourseRepository,
  LessonRepository,
  UnitRepository,
} from 'src/lms/repositories/lms.repository';

@Injectable()
export class LmsService {
  constructor(
    private courseRepository: CourseRepository,
    private unitRepository: UnitRepository,
    private lessonRepository: LessonRepository,
    private activityRepository: ActivityRepository,
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

  async getUnitsWithAssociatedLessonsForCourse(courseId: string) {
    return await this.unitRepository.listUnitsWithAssociatedLessonForCourse(
      courseId,
    );
  }

  async getLessonById(lessonId: string) {
    return await this.lessonRepository.findOneBy({ id: lessonId });
  }

  async getActivityById(activity: string) {
    return await this.activityRepository.findOneBy({ id: activity || null });
  }

  async getActivitiesForLesson(lessonId: string) {
    return await this.activityRepository.listActivitiesForLesson(lessonId);
  }

  async getCourseForProfile(profile: Profile) {
    const course = await this.courseRepository.findOneByOrFail({
      proficiencyLevel: profile.proficiencyLevel || null,
    });

    return course;
  }
}
