import { Test, TestingModule } from '@nestjs/testing';
import { ActivityResponseServiceService } from './activity-response-service.service';
import { ActivityResponseRepository } from 'src/lms-progress/repositories/activity-response.repository';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { ResultType } from 'src/lms-progress/entities/activity-response.entity';

describe('ActivityResponseServiceService', () => {
  let service: ActivityResponseServiceService;
  let repository: ActivityResponseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityResponseServiceService,
        {
          provide: ActivityResponseRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivityResponseServiceService>(
      ActivityResponseServiceService,
    );
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

    const activiyResponse = await service.createActivityResponse(
      profileId,
      data,
    );

    expect(repository.create).toHaveBeenCalledWith({
      activity: { id: data.activityId },
      profile: { id: profileId },
      responseData: data.responseData,
      timeTaken: data.timeTaken,
      result: data.result,
    });

    expect(activiyResponse.id).toEqual('arid');
  });
});
