import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/admin/admin.guard';
import {
  ActivityService,
  UpdatableActivityFields,
} from 'src/admin/services/activity.service';
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
    @Body() activity: Pick<Activity, 'type' | 'order' | 'lessonId' | 'data'>,
  ) {
    return await this.activityService.createActivity(activity);
  }

  @Get(':activityId')
  async getById(@Param('activityId') activityId: string) {
    return await this.activityService.getActivityById(activityId);
  }

  @Patch(':activityId')
  async update(
    @Param('activityId') activityId: string,
    @Body()
    activity: UpdatableActivityFields,
  ) {
    return await this.activityService.updateActivity(activityId, activity);
  }
}
