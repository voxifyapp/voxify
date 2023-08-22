import { Module } from '@nestjs/common';
import { ActivityResponseController } from './controllers/activity-response.controller';
import { ActivityResponseServiceService } from 'src/lms-progress/services/activity-response-service.service';

@Module({
  providers: [ActivityResponseServiceService],
  controllers: [ActivityResponseController],
})
export class LmsProgressModule {}
