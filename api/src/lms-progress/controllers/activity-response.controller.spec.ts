import { Test, TestingModule } from '@nestjs/testing';
import { ActivityResponseController } from './activity-response.controller';

describe('ActivityResponseController', () => {
  let controller: ActivityResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityResponseController],
    }).compile();

    controller = module.get<ActivityResponseController>(ActivityResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
