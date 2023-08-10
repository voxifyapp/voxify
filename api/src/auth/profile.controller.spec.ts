import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';
import {
  AddDaysToSubscriptionDto,
  SetProficiencyLevelDto,
} from 'src/auth/dto/update-profile.dto';
import { ProficiencyLevel, Profile } from 'src/auth/entities/profile.entity';
import { decodedTokenFactory } from 'src/auth/fixtures/decoded-token.fixture';
import { firebaseUserFactory } from 'src/auth/fixtures/firebase-user.fixture';
import { profileFactory } from 'src/auth/fixtures/profile.fixture';
import {
  AuthenticatedRequest,
  AuthenticatedRequestWithProfile,
} from 'src/common/request';
import { ProfileController } from './profile.controller';
import { ProfileService } from './services/profile.service';

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

  describe('create', () => {
    it('should create profile', async () => {
      const mockUser = firebaseUserFactory.build();
      const result = profileFactory.build({ userId: mockUser.uid });
      service.findOrCreate = jest.fn().mockResolvedValue(result);

      expect(
        await controller.create({
          decodedFirebaseUser: decodedTokenFactory.build(),
        } as AuthenticatedRequest),
      ).toBe(result);
    });
  });

  describe('addDaysToSubscription', () => {
    it('should add days to subscription', async () => {
      const mockUser = decodedTokenFactory.build();
      const mockProfile = profileFactory.build({ userId: mockUser.uid });
      const subscriptionEndDate = dayjs().add(7, 'day').toDate();
      const mockDto: AddDaysToSubscriptionDto = { freeTrialDays: 7 };
      service.addDaysToSubscription = jest.fn().mockResolvedValue({
        ...mockProfile,
        subscriptionEndDate: subscriptionEndDate,
      } as Profile);

      const result = await controller.addDaysToSubscription(
        {
          decodedFirebaseUser: mockUser,
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
  });

  describe('get', () => {
    it('should return the current profile', async () => {
      const mockUser = decodedTokenFactory.build();
      const mockProfile = profileFactory.build({ userId: mockUser.uid });
      const mockReq = {
        currentProfile: { ...mockProfile },
      } as AuthenticatedRequestWithProfile;

      const result = await controller.get(mockReq);

      expect(result.id).toBe(mockProfile.id);
    });
  });

  describe('setProficiencyLevel', () => {
    it('should set proficiency level', async () => {
      const mockUser = decodedTokenFactory.build();
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
          decodedFirebaseUser: mockUser,
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
