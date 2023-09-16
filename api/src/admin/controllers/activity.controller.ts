import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/admin/admin.guard';
import { ActivityService } from 'src/admin/services/activity.service';
import { DoesNotRequireProfile } from 'src/common/decorators/auth';
import { Activity } from 'src/lms/entities/Activity.entity';

@Controller('admin/activities/')
@DoesNotRequireProfile()
@UseGuards(AdminGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async findAll(@Query('lessonId') lessonId?: string) {
    return await this.activityService.getActivities({ lessonId });
  }

  @Post()
  async create(
    @Body() activity: Pick<Activity, 'type' | 'order' | 'lessonId'>,
  ) {
    return await this.activityService.createActivity(activity);
  }
}
