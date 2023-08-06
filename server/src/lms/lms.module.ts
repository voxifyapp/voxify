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

@Module({
  imports: [TypeOrmModule.forFeature([Course, Unit])],
  providers: [
    LmsService,
    CourseRepository,
    UnitRepository,
    LessonRepository,
    ActivityRepository,
  ],
})
export class LmsModule {}
