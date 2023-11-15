import { Injectable } from '@nestjs/common';
import { LessonResponse } from 'src/lms-progress/entities/lesson-response.entity';
import { UnitResponse } from 'src/lms-progress/entities/unit-response.entity';
import { Lesson } from 'src/lms/entities/lesson.entity';
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

  async getLessonResponsesWithLessonsForProfile(
    profileId: string,
    courseId: string,
  ) {
    const query = this.dataSource
      .getRepository(Lesson)
      .createQueryBuilder('lesson')
      .innerJoinAndSelect('lesson.unit', 'unit', 'unit.courseId = :courseId', {
        courseId,
      })
      .leftJoinAndSelect(
        LessonResponse,
        'lessonResponse',
        'lessonResponse.lessonId = lesson.id',
      )
      .where('lessonResponse.profileId = :profileId')
      .orderBy('unit.order')
      .addOrderBy('lesson.order')
      .setParameter('profileId', profileId);

    console.log(query.getSql());
    return query.getRawMany();
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
