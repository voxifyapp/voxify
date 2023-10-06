import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/lms/entities/activity.entity';
import { Repository } from 'typeorm';

export type UpdatableActivityFields = Partial<
  Pick<Activity, 'order' | 'lessonId' | 'data' | 'published'>
>;
@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async getActivities({ lessonId }: { lessonId?: string }) {
    return await this.activityRepository.find({
      where: { lessonId },
      relations: { lesson: true },
      order: lessonId ? { order: 'ASC' } : { createdAt: 'DESC' },
      withDeleted: true,
    });
  }

  async getActivityById(activityId: string) {
    return await this.activityRepository.findOneBy({ id: activityId });
  }

  async createActivity(
    data: Pick<Activity, 'type' | 'order' | 'lessonId' | 'data'>,
  ) {
    return await this.activityRepository.save({
      ...data,
    });
  }

  async updateActivity(
    activityId: string,
    data: UpdatableActivityFields,
  ): Promise<Activity> {
    return await this.activityRepository.save({
      id: activityId,
      ...data,
    });
  }
}
