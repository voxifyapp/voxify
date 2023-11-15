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

  async listUnitsWithAssociatedLessonForCourse(
    profileId: string,
    courseId: string,
  ) {
    const subQuery = this.dataSource
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
      .setParameter('profileId', profileId);

    // const finalQuery = this.dataSource
    //   .createQueryBuilder()
    //   .leftJoinAndSelect(
    //     (qb) =>
    //       qb
    //         .select()
    //         .from(subQuery.getQuery(), 'lesson_unit')
    //         .leftJoinAndSelect(LessonResponse, 'lessonResponse'),
    //     'lessonResponseUser',
    //   );

    console.log(subQuery.getSql());
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
