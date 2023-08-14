import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/lms/entities/course.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import {
  ActivityRepository,
  CourseRepository,
  LessonRepository,
  UnitRepository,
} from 'src/lms/repositories/lms.repository';
import { LmsService } from 'src/lms/services/lms.service';
import { LmsController } from './lms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Unit])],
  providers: [
    LmsService,
    CourseRepository,
    UnitRepository,
    LessonRepository,
    ActivityRepository,
  ],
  exports: [
    CourseRepository,
    UnitRepository,
    LessonRepository,
    ActivityRepository,
  ],
  controllers: [LmsController],
})
export class LmsModule {}
