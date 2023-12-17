import { Injectable } from '@nestjs/common';
import { LessonResponse } from 'src/lms-progress/entities/lesson-response.entity';
import { UnitResponse } from 'src/lms-progress/entities/unit-response.entity';
import { LessonUnitWithStatus } from 'src/lms-progress/types/lesson-unit-with-status';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LessonResponseRepository extends Repository<LessonResponse> {
  static fieldsToSelect = [
    'lesson.id',
    'lesson.createdAt',
    'lesson.title',
    'lesson.order',
    'unit.id',
    'unit.createdAt',
    'unit.title',
    'unit.order',
    // fields part of the subquery are not automagically recognized and needs to be wrapped in double quotes
    '"lessonResponse"."status"',
  ];

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

  async getUnitsWithLessonCompletionStatus(
    profileId: string,
    courseId: string,
  ): Promise<LessonUnitWithStatus[]> {
    const query = this.dataSource
      .getRepository(Unit)
      .createQueryBuilder('u')
      .select('u.*')
      .addSelect(
        'jsonb_agg("lessonsWithCompletionStatus")',
        'lessonsWithStatus',
      )
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select('l.*')
            .addSelect('lr.status', 'lessonCompletionStatus')
            .from(Lesson, 'l') // Replace 'Lesson' with your lesson entity class
            .leftJoin(
              'lesson_response',
              'lr',
              'lr."lessonId" = l.id AND lr.status = :status AND lr.profileId = :profileId',
              { status: 'COMPLETED', profileId },
            )
            .distinctOn(['l.id']);
        },
        'lessonsWithCompletionStatus',
        '"lessonsWithCompletionStatus"."unitId" = u.id',
      )
      .where('u.courseId = :courseId', { courseId })
      .groupBy('u.id')
      .orderBy('u.order');

    return query.getRawMany();
  }
}
