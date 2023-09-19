import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/lms/entities/Activity.entity';
import { Repository } from 'typeorm';

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
      withDeleted: true,
    });
  }

  async getActivityById(activityId: string) {
    return await this.activityRepository.findOneBy({ id: activityId });
  }

  async createActivity({
    type,
    order,
    lessonId,
    data,
  }: Pick<Activity, 'type' | 'order' | 'lessonId' | 'data'>) {
    return await this.activityRepository.save({
      type,
      order,
      lessonId,
      data,
    });
  }

  async updateActivity({
    order,
    lessonId,
    data,
  }: Pick<Activity, 'order' | 'lessonId' | 'data'>) {
    return await this.activityRepository.save({
      data,
      order,
      lessonId,
    });
  }
}
