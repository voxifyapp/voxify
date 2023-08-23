import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { ActivityResponseRepository } from 'src/lms-progress/repositories/activity-response.repository';
import { ActivityRepository } from 'src/lms/repositories/lms.repository';

@Injectable()
export class ActivityResponseService {
  constructor(
    private activityResponseRepo: ActivityResponseRepository,
    private activityRepo: ActivityRepository,
  ) {}

  async create(profileId: string, data: CreateActivityResponseDto) {
    const activity = await this.activityRepo.findOne({
      where: { id: data.activityId },
    });

    if (!activity) throw new NotFoundException('Activity not found');

    return await this.activityResponseRepo.save(
      {
        activityId: activity.id,
        profileId: profileId,
        responseData: data.responseData,
        timeTaken: data.timeTaken,
        result: data.result,
      },
      { reload: true },
    );
  }

  async getActivityResponses(
    profileId: string,
    filters: { forActivityId?: string },
  ) {
    const activityResponses =
      await this.activityResponseRepo.getActivityResponsesForProfile(
        profileId,
        filters,
      );

    return activityResponses;
  }
}
