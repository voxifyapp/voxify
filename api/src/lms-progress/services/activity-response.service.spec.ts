import { Test, TestingModule } from '@nestjs/testing';
import { ActivityResponseService } from './activity-response.service';
import { ActivityResponseRepository } from 'src/lms-progress/repositories/activity-response.repository';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { ResultType } from 'src/lms-progress/entities/activity-response.entity';
import { mockRepository } from 'src/common/mocks/mockedRepository';

describe('ActivityResponseService', () => {
  let service: ActivityResponseService;
  let repository: ActivityResponseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityResponseService,
        mockRepository(ActivityResponseRepository),
      ],
    }).compile();

    service = module.get<ActivityResponseService>(ActivityResponseService);
    repository = module.get<ActivityResponseRepository>(
      ActivityResponseRepository,
    );
  });

  it('should create an activity response', async () => {
    const profileId = '123';
    const data: CreateActivityResponseDto = {
      activityId: '456',
      responseData: {},
      timeTaken: 10,
      result: ResultType.SUCCESS,
    };

    repository.create = jest.fn().mockResolvedValue({ ...data, id: 'arid' });

    const activityResponse = await service.create(profileId, data);

    expect(repository.create).toHaveBeenCalledWith({
      activity: { id: data.activityId },
      profile: { id: profileId },
      responseData: data.responseData,
      timeTaken: data.timeTaken,
      result: data.result,
    });

    expect(activityResponse.id).toEqual('arid');
  });
});
