import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/lms/entities/Activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private ActivityRepository: Repository<Activity>,
  ) {}

  async getActivities({ lessonId }: { lessonId?: string }) {
    return await this.ActivityRepository.find({
      where: { lessonId },
      relations: { lesson: true },
      withDeleted: true,
    });
  }

  async createActivity({
    type,
    order,
    lessonId,
  }: Pick<Activity, 'type' | 'order' | 'lessonId'>) {
    return await this.ActivityRepository.save({
      type,
      order,
      lessonId,
    });
  }
}
