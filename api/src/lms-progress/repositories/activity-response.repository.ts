import { Injectable } from '@nestjs/common';
import { ActivityResponse } from 'src/lms-progress/entities/activity-response.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ActivityResponseRepository extends Repository<ActivityResponse> {
  constructor(private dataSource: DataSource) {
    super(ActivityResponse, dataSource.createEntityManager());
  }
}
