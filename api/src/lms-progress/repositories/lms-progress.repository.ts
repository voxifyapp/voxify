import { Injectable } from '@nestjs/common';
import { LessonResponse } from 'src/lms-progress/entities/lesson-response.entity';
import { UnitResponse } from 'src/lms-progress/entities/unit-response.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LessonResponseRepository extends Repository<LessonResponse> {
  constructor(private dataSource: DataSource) {
    super(LessonResponse, dataSource.createEntityManager());
  }

  async getLessonResponses(profileId, filter: { forLessonId?: string }) {
    return await this.find({
      where: { profileId, lessonId: filter.forLessonId },
    });
  }
}

@Injectable()
export class UnitResponseRepository extends Repository<UnitResponse> {
  constructor(private dataSource: DataSource) {
    super(UnitResponse, dataSource.createEntityManager());
  }

  async getUnitResponses(profileId, filter: { forUnitId?: string }) {
    return await this.find({
      where: { profileId, unitId: filter.forUnitId },
    });
  }
}
