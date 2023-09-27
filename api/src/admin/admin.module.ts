import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProfile } from 'src/admin/entities/admin-profile.entity';
import { CourseService } from 'src/admin/services/course.service';
import { Activity } from 'src/lms/entities/activity.entity';
import { Course } from 'src/lms/entities/course.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { CourseController } from './controllers/course.controller';
import { LessonController } from './controllers/lesson.controller';
import { AdminProfileService } from './services/admin-profile.service';
import { LessonService } from './services/lesson.service';
import { UnitService } from './services/unit.service';
import { UnitController } from './controllers/unit.controller';
import { ActivityService } from './services/activity.service';
import { ActivityController } from './controllers/activity.controller';

@Module({
  controllers: [
    CourseController,
    LessonController,
    UnitController,
    ActivityController,
  ],
  providers: [
    CourseService,
    AdminProfileService,
    LessonService,
    UnitService,
    ActivityService,
  ],
  imports: [
    TypeOrmModule.forFeature([Course, AdminProfile, Unit, Lesson, Activity]),
  ],
})
export class AdminModule {}
