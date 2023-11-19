import { Injectable, UnauthorizedException } from '@nestjs/common';
import { findOneOr404 } from 'src/common/utils/find-or-404';
import {
  CreateLessonResponseDto,
  CreateUnitResponseDto,
  UpdateLessonResponseDto,
} from 'src/lms-progress/dtos/lms-progress.dto';
import {
  LessonResponse,
  LessonResponseStatus,
} from 'src/lms-progress/entities/lesson-response.entity';
import {
  LessonResponseRepository,
  UnitResponseRepository,
} from 'src/lms-progress/repositories/lms-progress.repository';
import { LessonUnitWithStatus } from 'src/lms-progress/types/lesson-unit-with-status';
import {
  LessonRepository,
  UnitRepository,
} from 'src/lms/repositories/lms.repository';

@Injectable()
export class LmsProgressService {
  constructor(
    private lessonResponseRepo: LessonResponseRepository,
    private unitResponseRepo: UnitResponseRepository,
    private lessonRepo: LessonRepository,
    private unitRepo: UnitRepository,
  ) {}

  async createLessonResponse(profileId: string, data: CreateLessonResponseDto) {
    const lesson = await findOneOr404(this.lessonRepo, data.lessonId);

    const lessonResponse = await this.lessonResponseRepo.save(
      { lessonId: lesson.id, profileId, status: data.status },
      { reload: true },
    );

    return lessonResponse;
  }

  async updateLessonResponse(profileId: string, data: UpdateLessonResponseDto) {
    const existingLessonResponse = <LessonResponse>(
      await findOneOr404(this.lessonResponseRepo, data.lessonResponseId)
    );
    if (existingLessonResponse.profileId !== profileId) {
      throw new UnauthorizedException();
    }
    const lessonResponse = await this.lessonResponseRepo.update(
      existingLessonResponse.id,
      { status: data.status },
    );

    return lessonResponse;
  }

  async createUnitResponse(profileId: string, data: CreateUnitResponseDto) {
    const unit = await findOneOr404(this.unitRepo, data.unitId);

    const lessonResponse = await this.unitResponseRepo.save(
      { unitId: unit.id, profileId },
      { reload: true },
    );

    return lessonResponse;
  }

  async getLessonResponses(
    profileId: string,
    filters: { forLessonId?: string } = {},
  ) {
    const lessonResponses = await this.lessonResponseRepo.getLessonResponses(
      profileId,
      filters,
    );

    return lessonResponses;
  }

  async getUnitsAndLessonsWithStatusForProfile(
    profileId: string,
    courseId: string,
  ) {
    const data =
      await this.lessonResponseRepo.getUnitsAndLessonsWithStatusForProfile(
        profileId,
        courseId,
      );

    return this.parse(data);
  }

  async getUnitResponses(
    profileId: string,
    filters: { forUnitId?: string } = {},
  ) {
    const unitResponses = await this.unitResponseRepo.getUnitResponses(
      profileId,
      filters,
    );

    return unitResponses;
  }

  // Method to parse data containing lesson, unit and lessonResponse data fetched from DB
  // into an ordered list of units with lesson info and status for profile
  private parse(data: LessonUnitWithStatus[]) {
    const unitLesonResponseWithCompletion = [];
    let lessonsForUnit: Array<
      Pick<LessonUnitWithStatus, 'lesson_id' | 'lesson_title' | 'lesson_order'>
    > = [];
    let unitUnderProcessing: string = data[0].unit_id;
    let lessonsSeenForUnit = new Set();

    data.forEach((lessonUnitResponse) => {
      const unitId = lessonUnitResponse.unit_id;

      if (unitId !== unitUnderProcessing) {
        const obj = {};
        obj[unitUnderProcessing] = lessonsForUnit;

        unitLesonResponseWithCompletion.push(obj);
        unitUnderProcessing = unitId;
        lessonsForUnit = [];
        lessonsSeenForUnit = new Set();
      }

      if (lessonsSeenForUnit.has(lessonUnitResponse.lesson_id)) {
        return;
      }

      const lessonData = {
        lesson_title: lessonUnitResponse.lesson_title,
        lesson_order: lessonUnitResponse.lesson_order,
        lesson_id: lessonUnitResponse.lesson_id,
        lesson_status: lessonUnitResponse.status,
      };

      lessonsForUnit.push(lessonData);
      lessonsSeenForUnit.add(lessonUnitResponse.lesson_id);
    });
    const obj = {};
    obj[unitUnderProcessing] = lessonsForUnit;
    unitLesonResponseWithCompletion.push(obj);
    return { result: unitLesonResponseWithCompletion };
  }
}
