import { Module } from '@nestjs/common';
import { CourseEnrollmentService } from './services/course-enrollment.service';

@Module({
  providers: [CourseEnrollmentService],
})
export class LmsProgressModule {}
