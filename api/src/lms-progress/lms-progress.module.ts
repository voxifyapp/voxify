import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityResponse } from 'src/lms-progress/entities/activity-response.entity';
import { ActivityResponseRepository } from 'src/lms-progress/repositories/activity-response.repository';
import { ActivityResponseService } from 'src/lms-progress/services/activity-response.service';
import { ActivityResponseController } from './controllers/activity-response.controller';

@Module({
  providers: [ActivityResponseService, ActivityResponseRepository],
  controllers: [ActivityResponseController],
  imports: [TypeOrmModule.forFeature([ActivityResponse])],
})
export class LmsProgressModule {}
