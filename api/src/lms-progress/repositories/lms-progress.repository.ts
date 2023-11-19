import { Injectable } from '@nestjs/common';
import { LessonResponse } from 'src/lms-progress/entities/lesson-response.entity';
import { UnitResponse } from 'src/lms-progress/entities/unit-response.entity';
import { LessonUnitWithStatus } from 'src/lms-progress/types/lesson-unit-with-status';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { CreateDateColumn, DataSource, Repository } from 'typeorm';

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

  async getUnitsAndLessonsWithStatusForProfile(
    profileId: string,
    courseId: string,
  ): Promise<LessonUnitWithStatus[]> {
    const combineLessonUnitAndLessonResponseQuery = this.dataSource
      .getRepository(Lesson)
      .createQueryBuilder('lesson')
      .select(LessonResponseRepository.fieldsToSelect)
      .innerJoin(
        'lesson.unit',
        'unit',
        'unit.courseId = :courseId AND lesson.published = true AND unit.published = true',
        {
          courseId,
        },
      )
      .leftJoin(
        (subQuery) => {
          return subQuery
            .select()
            .from(LessonResponse, 'lr')
            .where('lr.profileId = :profileId', { profileId })
            .orderBy('lr.createdAt', 'DESC');
        },
        'lessonResponse',
        '"lessonResponse"."lessonId" = lesson.id',
      )
      // sort first by unit order
      .orderBy('unit.order')
      // and then sort by lesson order within that unit
      .addOrderBy('lesson.order');

    return combineLessonUnitAndLessonResponseQuery.getRawMany();
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
