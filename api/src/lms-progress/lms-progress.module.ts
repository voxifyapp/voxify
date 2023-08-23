import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityResponse } from 'src/lms-progress/entities/activity-response.entity';
import { ActivityResponseRepository } from 'src/lms-progress/repositories/activity-response.repository';
import { ActivityResponseService } from 'src/lms-progress/services/activity-response.service';
import {
  ActivityRepository,
  LessonRepository,
} from 'src/lms/repositories/lms.repository';
import { ActivityResponseController } from './controllers/activity-response.controller';
import { LmsProgressService } from 'src/lms-progress/services/lms-progress.service';
import { UnitResponseRepository } from 'src/lms-progress/repositories/lms-progress.repository';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Unit } from 'src/lms/entities/unit.entity';

@Module({
  providers: [
    ActivityResponseService,
    ActivityResponseRepository,
    ActivityRepository,
    LmsProgressService,
    UnitResponseRepository,
    LessonRepository,
  ],
  controllers: [ActivityResponseController],
  imports: [TypeOrmModule.forFeature([ActivityResponse, Lesson, Unit])],
})
export class LmsProgressModule {}
