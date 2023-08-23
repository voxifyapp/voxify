import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mockRepository } from 'src/common/mocks/mockedRepository';
import {
  lessonResponseFactory,
  unitResponseFactory,
} from 'src/lms-progress/fixtures/lms-progress.fixture';
import {
  LessonResponseRepository,
  UnitResponseRepository,
} from 'src/lms-progress/repositories/lms-progress.repository';
import { lessonFactory, unitFactory } from 'src/lms/fixtures/lms.fixtures';
import {
  LessonRepository,
  UnitRepository,
} from 'src/lms/repositories/lms.repository';
import { LmsProgressService } from './lms-progress.service';

describe('LmsProgressService', () => {
  let service: LmsProgressService;
  let lessonResponseRepo: LessonResponseRepository;
  let unitResponseRepo: UnitResponseRepository;
  let lessonRepo: LessonRepository;
  let unitRepo: UnitRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LmsProgressService,
        mockRepository(LessonResponseRepository),
        mockRepository(UnitResponseRepository),
        mockRepository(LessonRepository),
        mockRepository(UnitRepository),
      ],
    }).compile();

    service = moduleRef.get<LmsProgressService>(LmsProgressService);
    lessonResponseRepo = moduleRef.get<LessonResponseRepository>(
      LessonResponseRepository,
    );
    unitResponseRepo = moduleRef.get<UnitResponseRepository>(
      UnitResponseRepository,
    );
    lessonRepo = moduleRef.get<LessonRepository>(LessonRepository);
    unitRepo = moduleRef.get<UnitRepository>(UnitRepository);
  });

  describe('createUnitResponse', () => {
    it('should create a lesson response', async () => {
      const lessonId = '123';
      const profileId = '456';
      const data = { lessonId };

      const lesson = lessonFactory.build({ id: lessonId });
      lessonRepo.findOne = jest.fn().mockResolvedValue(lesson);

      const lessonResponse = { lessonId: lesson.id, profileId };
      lessonResponseRepo.save = jest
        .fn()
        .mockReturnValue(lessonResponseFactory.build({ profileId, lessonId }));

      const result = await service.createLessonResponse(profileId, data);

      expect(lessonRepo.findOne).toHaveBeenCalledWith({
        where: { id: lessonId },
      });
      expect(lessonResponseRepo.save).toHaveBeenCalledWith(lessonResponse, {
        reload: true,
      });
      expect(result.lessonId).toEqual(lessonResponse.lessonId);
      expect(result.profileId).toEqual(lessonResponse.profileId);
    });

    it('should throw an error if the lesson does not exist', async () => {
      const lessonId = '123';
      const profileId = '456';
      const data = { lessonId };

      lessonRepo.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        service.createLessonResponse(profileId, data),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUnitResponse', () => {
    it('should create a unit response', async () => {
      const unitId = '123';
      const profileId = '456';
      const data = { unitId };

      const unit = unitFactory.build({ id: unitId });
      unitRepo.findOne = jest.fn().mockResolvedValue(unit);

      const unitResponse = { unitId: unit.id, profileId };
      unitResponseRepo.save = jest
        .fn()
        .mockReturnValue(unitResponseFactory.build({ profileId, unitId }));

      const result = await service.createUnitResponse(profileId, data);

      expect(unitRepo.findOne).toHaveBeenCalledWith({
        where: { id: unitId },
      });
      expect(unitResponseRepo.save).toHaveBeenCalledWith(unitResponse, {
        reload: true,
      });
      expect(result.unitId).toEqual(unitResponse.unitId);
      expect(result.profileId).toEqual(unitResponse.profileId);
    });

    it('should throw an error if the lesson does not exist', async () => {
      const unitId = '123';
      const profileId = '456';
      const data = { unitId };

      unitRepo.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.createUnitResponse(profileId, data)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
