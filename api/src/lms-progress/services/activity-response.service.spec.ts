import { Test, TestingModule } from '@nestjs/testing';
import { ActivityResponseService } from './activity-response.service';
import { ActivityResponseRepository } from 'src/lms-progress/repositories/activity-response.repository';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { ResultType } from 'src/lms-progress/entities/activity-response.entity';
import { mockRepository } from 'src/common/mocks/mockedRepository';
import { ActivityRepository } from 'src/lms/repositories/lms.repository';
import { NotFoundException } from '@nestjs/common';

describe('ActivityResponseService', () => {
  let service: ActivityResponseService;
  let repository: ActivityResponseRepository;
  let activityRepo: ActivityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityResponseService,
        mockRepository(ActivityResponseRepository),
        mockRepository(ActivityRepository),
      ],
    }).compile();

    service = module.get<ActivityResponseService>(ActivityResponseService);
    repository = module.get<ActivityResponseRepository>(
      ActivityResponseRepository,
    );
    activityRepo = module.get<ActivityRepository>(ActivityRepository);
  });

  describe('create', () => {
    it('should create an activity response', async () => {
      const profileId = '123';
      const data: CreateActivityResponseDto = {
        activityId: '456',
        responseData: {},
        timeTaken: 10,
        result: ResultType.SUCCESS,
      };
      const activity = { id: data.activityId };

      activityRepo.findOne = jest.fn().mockResolvedValue(activity);
      repository.save = jest.fn().mockResolvedValue({ ...data, id: 'arid' });

      const activityResponse = await service.create(profileId, data);

      expect(repository.save).toHaveBeenCalledWith(
        {
          activityId: data.activityId,
          profileId: profileId,
          responseData: data.responseData,
          timeTaken: data.timeTaken,
          result: data.result,
        },
        { reload: true },
      );

      expect(activityRepo.findOne).toHaveBeenCalledWith({
        where: { id: data.activityId },
      });

      expect(activityResponse.id).toEqual('arid');
    });

    it('should throw not found exception if activity does not exist', async () => {
      const profileId = '123';
      const data: CreateActivityResponseDto = {
        activityId: '456',
        responseData: {},
        timeTaken: 10,
        result: ResultType.SUCCESS,
      };

      activityRepo.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.create(profileId, data)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
