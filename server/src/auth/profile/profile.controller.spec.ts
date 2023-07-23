import { Test, TestingModule } from '@nestjs/testing';
import { firebaseUserFactory } from 'src/auth/firebase/firebase-user.fixture';
import { profileFactory } from 'src/auth/profile/profile.fixture';
import {
  AuthenticatedRequest,
  AuthenticatedRequestWithProfile,
} from 'src/common/request';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {
  AddDaysToSubscriptionDto,
  SetProficiencyLevelDto,
} from 'src/auth/profile/dto/update-profile.dto';
import { ProficiencyLevel, Profile } from 'src/auth/profile/profile.entity';
import * as dayjs from 'dayjs';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: { findOrCreate: jest.fn(), update: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create profile', async () => {
    const mockUser = firebaseUserFactory.build();
    const result = profileFactory.build({ userId: mockUser.uid });
    service.findOrCreate = jest.fn().mockResolvedValue(result);

    expect(
      await controller.create({
        firebaseUser: firebaseUserFactory.build(),
      } as AuthenticatedRequest),
    ).toBe(result);
  });

  it('should add days to subscription', async () => {
    const mockUser = firebaseUserFactory.build();
    const mockProfile = profileFactory.build({ userId: mockUser.uid });
    const subscriptionEndDate = dayjs().add(7, 'day').toDate();
    const mockDto: AddDaysToSubscriptionDto = { freeTrialDays: 7 };
    service.addDaysToSubscription = jest.fn().mockResolvedValue({
      ...mockProfile,
      subscriptionEndDate: subscriptionEndDate,
    } as Profile);

    const result = await controller.addDaysToSubscription(
      {
        firebaseUser: mockUser,
        currentProfile: mockProfile,
      } as AuthenticatedRequestWithProfile,
      mockDto,
    );

    expect(result.subscriptionEndDate).toBe(subscriptionEndDate);
    expect(service.addDaysToSubscription).toHaveBeenCalledWith(
      mockProfile.id,
      mockDto.freeTrialDays,
    );
  });

  describe('setProficiencyLevel', () => {
    it('should set proficiency level', async () => {
      const mockUser = firebaseUserFactory.build();
      const mockProfile = profileFactory.build({ userId: mockUser.uid });
      const mockDto: SetProficiencyLevelDto = {
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      };
      service.setProficiencyLevel = jest.fn().mockResolvedValue({
        ...mockProfile,
        proficiencyLevel: ProficiencyLevel.ADVANCED,
      });

      const result = await controller.setProficiencyLevel(
        {
          firebaseUser: mockUser,
          currentProfile: mockProfile,
        } as AuthenticatedRequestWithProfile,
        mockDto,
      );

      expect(result.proficiencyLevel).toBe(ProficiencyLevel.ADVANCED);
      expect(service.setProficiencyLevel).toHaveBeenCalledWith(
        mockProfile.id,
        mockDto.proficiencyLevel,
      );
    });
  });
});
