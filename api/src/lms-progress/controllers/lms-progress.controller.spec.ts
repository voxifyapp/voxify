import { Test, TestingModule } from '@nestjs/testing';
import { mockService } from 'src/common/mocks/mockService';
import { AuthenticatedRequestWithProfile } from 'src/common/request';
import {
  LessonResponseController,
  UnitResponseController,
} from 'src/lms-progress/controllers/lms-progress.controller';
import {
  CreateLessonResponseDto,
  CreateUnitResponseDto,
} from 'src/lms-progress/dtos/lms-progress.dto';
import {
  lessonResponseFactory,
  unitResponseFactory,
} from 'src/lms-progress/fixtures/lms-progress.fixture';
import { LmsProgressService } from 'src/lms-progress/services/lms-progress.service';
import { lessonFactory, unitFactory } from 'src/lms/fixtures/lms.fixtures';

describe('LessonResponseController', () => {
  let controller: LessonResponseController;
  let unitResponseController: UnitResponseController;
  let service: LmsProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonResponseController, UnitResponseController],
      providers: [mockService(LmsProgressService)],
    }).compile();

    controller = module.get(LessonResponseController);
    unitResponseController = module.get(UnitResponseController);
    service = module.get(LmsProgressService);
  });

  describe('createLessonResponse', () => {
    it('should create a new activity response', async () => {
      const lessonId = 'lesson-id';

      const req: AuthenticatedRequestWithProfile = {
        currentProfile: { id: 'profile-id' },
      } as any;

      const expectedResult = lessonResponseFactory.build({
        id: 'lrid',
        lesson: lessonFactory.build({ id: lessonId }),
      });
      service.createLessonResponse = jest
        .fn()
        .mockResolvedValue(expectedResult);

      const result = await controller.create(req, {
        lessonId,
      } as CreateLessonResponseDto);

      expect(result).toBe(expectedResult);
      expect(service.createLessonResponse).toHaveBeenCalledWith('profile-id', {
        lessonId,
      });
    });
  });

  describe('createUnitResponse', () => {
    it('should create a new activity response', async () => {
      const unitId = 'unit-id';

      const req: AuthenticatedRequestWithProfile = {
        currentProfile: { id: 'profile-id' },
      } as any;

      const expectedResult = unitResponseFactory.build({
        id: 'lrid',
        unit: unitFactory.build({ id: unitId }),
      });
      service.createUnitResponse = jest.fn().mockResolvedValue(expectedResult);

      const result = await unitResponseController.create(req, {
        unitId: unitId,
      } as CreateUnitResponseDto);

      expect(result).toBe(expectedResult);
      expect(service.createUnitResponse).toHaveBeenCalledWith('profile-id', {
        unitId,
      });
    });
  });
});
