import { Injectable } from '@nestjs/common';
import { findOneOr404 } from 'src/common/utils/find-or-404';
import {
  CreateLessonResponseDto,
  CreateUnitResponseDto,
} from 'src/lms-progress/dtos/lms-progress.dto';
import {
  LessonResponseRepository,
  UnitResponseRepository,
} from 'src/lms-progress/repositories/lms-progress.repository';
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
      { lessonId: lesson.id, profileId },
      { reload: true },
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
}
