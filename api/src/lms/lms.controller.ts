import { Controller, Get, Param, Req } from '@nestjs/common';
import { AuthenticatedRequestWithProfile } from 'src/common/request';
import { LmsService } from 'src/lms/services/lms.service';

@Controller('lms')
export class LmsController {
  constructor(private readonly lmsService: LmsService) {}

  @Get('courses')
  async getCourses() {
    return await this.lmsService.getCourses();
  }

  @Get('courses/current-course-for-profile')
  async getCurrentCourseForProfile(
    @Req() req: AuthenticatedRequestWithProfile,
  ) {
    return await this.lmsService.getCourseForProfile(req.currentProfile);
  }

  @Get('courses/:courseId')
  async getCourseById(@Param('courseId') courseId: string) {
    return await this.lmsService.getCourseById(courseId);
  }

  @Get('courses/:courseId/units')
  async getUnitsWithAssociatedLessonsForCourse(
    @Param('courseId') courseId: string,
  ) {
    return await this.lmsService.getUnitsWithAssociatedLessonsForCourse(
      courseId,
    );
  }

  @Get('lesson/:lessonId')
  async getLessonById(@Param('lessonId') lessonId: string) {
    return await this.lmsService.getLessonById(lessonId);
  }

  @Get('lesson/:lessonId/activities')
  async getActivitiesForLesson(@Param('lessonId') lessonId: string) {
    return await this.lmsService.getActivitiesForLesson(lessonId);
  }

  @Get('activities/:activityId')
  async getActivityById(@Param('activityId') activityId: string) {
    return await this.lmsService.getActivityById(activityId);
  }
}
