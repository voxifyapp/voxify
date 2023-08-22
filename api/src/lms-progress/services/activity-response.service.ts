import { Injectable } from '@nestjs/common';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { ActivityResponseRepository } from 'src/lms-progress/repositories/activity-response.repository';

@Injectable()
export class ActivityResponseService {
  constructor(private activityResponseRepo: ActivityResponseRepository) {}

  async create(profileId: string, data: CreateActivityResponseDto) {
    return await this.activityResponseRepo.create({
      activity: { id: data.activityId },
      profile: { id: profileId },
      responseData: data.responseData,
      timeTaken: data.timeTaken,
      result: data.result,
    });
  }
}
