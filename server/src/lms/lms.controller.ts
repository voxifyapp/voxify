import { Controller, Get } from '@nestjs/common';
import { LmsService } from 'src/lms/services/lms.service';

@Controller('lms')
export class LmsController {
  constructor(private readonly lmsService: LmsService) {}

  @Get('courses')
  async getCourses() {
    return await this.lmsService.getCourses();
  }

  @Get('courses/:courseId')
  async getCourseById(courseId: string) {
    return await this.lmsService.getCourseById(courseId);
  }

  @Get('courses/:courseId/units')
  async getUnitsWithAssociatedLessonsForCourse(courseId: string) {
    return await this.lmsService.getUnitsWithAssociatedLessonsForCourse(
      courseId,
    );
  }

  @Get('lesson/:lessonId')
  async getLessonById(lessonId: string) {
    return await this.lmsService.getLessonById(lessonId);
  }

  @Get('lesson/:lessonId/activities')
  async getActivitiesForLesson(lessonId: string) {
    return await this.lmsService.getActivitiesForLesson(lessonId);
  }
}
