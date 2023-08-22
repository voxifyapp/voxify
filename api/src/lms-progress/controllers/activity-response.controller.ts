import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { AuthenticatedRequestWithProfile } from 'src/common/request';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { ActivityResponseService } from 'src/lms-progress/services/activity-response.service';

@Controller('lms-progress/activity-responses')
export class ActivityResponseController {
  constructor(private activityResponseService: ActivityResponseService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body() data: CreateActivityResponseDto,
  ) {
    const profile = await this.activityResponseService.create(
      req.currentProfile.id,
      data,
    );
    return profile;
  }
}
