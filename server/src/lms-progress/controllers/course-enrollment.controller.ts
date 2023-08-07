import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthenticatedRequestWithProfile } from 'src/common/request';
import { EnrollToCourseDto } from 'src/lms-progress/dto/enroll-to-course-dto';
import { CourseEnrollmentService } from 'src/lms-progress/services/course-enrollment.service';

@Controller('lms-progress')
export class ProfileController {
  constructor(
    private readonly courseEnrollmentService: CourseEnrollmentService,
  ) {}

  @Post('enroll-to-course/')
  async enrollToCourse(
    @Body() enrollToCourseDto: EnrollToCourseDto,
    @Req() req: AuthenticatedRequestWithProfile,
  ) {
    const { currentProfile } = req;
    return await this.courseEnrollmentService.enrollToCourse(
      currentProfile,
      enrollToCourseDto.courseId,
    );
  }
}
