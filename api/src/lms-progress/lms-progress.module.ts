import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityResponse } from 'src/lms-progress/entities/activity-response.entity';
import { LessonResponse } from 'src/lms-progress/entities/lesson-response.entity';
import { UnitResponse } from 'src/lms-progress/entities/unit-response.entity';
import { ActivityResponseRepository } from 'src/lms-progress/repositories/activity-response.repository';
import {
  LessonResponseRepository,
  UnitResponseRepository,
} from 'src/lms-progress/repositories/lms-progress.repository';
import { ActivityResponseService } from 'src/lms-progress/services/activity-response.service';
import { LmsProgressService } from 'src/lms-progress/services/lms-progress.service';
import {
  ActivityRepository,
  LessonRepository,
  UnitRepository,
} from 'src/lms/repositories/lms.repository';
import { ActivityResponseController } from './controllers/activity-response.controller';
import {
  LessonResponseController,
  UnitResponseController,
} from 'src/lms-progress/controllers/lms-progress.controller';

@Module({
  providers: [
    ActivityResponseService,
    ActivityResponseRepository,
    ActivityRepository,
    LmsProgressService,
    UnitResponseRepository,
    LessonResponseRepository,
    LessonRepository,
    UnitRepository,
  ],
  controllers: [
    ActivityResponseController,
    LessonResponseController,
    UnitResponseController,
  ],
  imports: [
    TypeOrmModule.forFeature([ActivityResponse, LessonResponse, UnitResponse]),
  ],
})
export class LmsProgressModule {}
