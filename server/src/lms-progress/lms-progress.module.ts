import { Module } from '@nestjs/common';
import { CourseEnrollmentService } from './services/course-enrollment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEnrollment } from 'src/lms-progress/entities/course-enrollment.entity';
import { CourseEnrollmentRepository } from 'src/lms-progress/repositories/course-enrollment.repository';
import { CourseRepository } from 'src/lms/repositories/lms.repository';
import { CourseEnrollmentController } from 'src/lms-progress/controllers/course-enrollment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEnrollment])],
  providers: [
    CourseEnrollmentService,
    CourseEnrollmentRepository,
    CourseRepository,
  ],
  controllers: [CourseEnrollmentController],
})
export class LmsProgressModule {}
