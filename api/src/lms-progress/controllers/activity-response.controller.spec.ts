import { Test, TestingModule } from '@nestjs/testing';
import { ActivityResponseController } from './activity-response.controller';
import { ActivityResponseService } from 'src/lms-progress/services/activity-response.service';
import { CreateActivityResponseDto } from 'src/lms-progress/dtos/create-activity-response.dto';
import { AuthenticatedRequestWithProfile } from 'src/common/request';
import { activityResponseFactory } from 'src/lms-progress/fixtures/lms-progress.fixture';
import { activityFactory } from 'src/lms/fixtures/lms.fixtures';
import { mockService } from 'src/common/mocks/mockService';

describe('ActivityResponseController', () => {
  let controller: ActivityResponseController;
  let service: ActivityResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityResponseController],
      providers: [mockService(ActivityResponseService)],
    }).compile();

    controller = module.get<ActivityResponseController>(
      ActivityResponseController,
    );
    service = module.get<ActivityResponseService>(ActivityResponseService);
  });

  describe('create', () => {
    it('should create a new activity response', async () => {
      const req: AuthenticatedRequestWithProfile = {
        currentProfile: { id: 'profile-id' },
      } as any;

      const expectedResult = activityResponseFactory.build({
        id: 'arid',
        activity: activityFactory.build({ id: 'activity-id' }),
      });
      service.create = jest.fn().mockResolvedValue(expectedResult);

      const result = await controller.create(req, {
        activityId: 'activity-id',
        responseData: {},
        timeTaken: 10,
        result: 'SUCCESS',
      } as CreateActivityResponseDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith('profile-id', {
        activityId: 'activity-id',
        responseData: {},
        timeTaken: 10,
        result: 'SUCCESS',
      });
    });
  });
});
