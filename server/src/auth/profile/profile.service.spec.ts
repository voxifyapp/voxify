import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { ProficiencyLevel, Profile } from 'src/auth/profile/profile.entity';
import { profileFactory } from 'src/auth/profile/profile.fixture';
import { ProfileRepository } from 'src/auth/profile/profile.repository';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let profileRepo: ProfileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: ProfileRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    profileRepo = module.get<ProfileRepository>(
      getRepositoryToken(ProfileRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new profile', async () => {
    const userId = 'test-user-id';
    profileRepo.create = jest.fn().mockImplementationOnce(async (args) => {
      return {
        ...profileFactory.build(),
        userId: args['userId'],
      };
    });
    const result = await service.findOrCreate(userId);

    expect(profileRepo.create).toBeCalledWith({ userId });
    expect(result.userId).toBe(userId);
  });

  it('if an existing profile already exists, should return that and not create a new profile', async () => {
    const userId = 'test-user-id';
    const existingProfile = profileFactory.build({
      userId,
      proficiencyLevel: ProficiencyLevel.BEGINNER,
    });
    profileRepo.findOne = jest.fn().mockImplementationOnce(async () => {
      return {
        ...existingProfile,
      };
    });

    const result = await service.findOrCreate(userId);
    expect(profileRepo.findOne).toHaveBeenCalledWith({ where: { userId } });
    expect(profileRepo.create).not.toHaveBeenCalled();
    expect(result.userId).toBe(userId);
  });

  it('should return the existing profile for a user', async () => {
    const userId = 'test-user-id';
    const existingProfile = profileFactory.build({
      userId,
      proficiencyLevel: ProficiencyLevel.BEGINNER,
    });
    profileRepo.findOneBy = jest.fn().mockResolvedValue(existingProfile);

    const result = await service.findProfileForUser(userId);

    expect(profileRepo.findOneBy).toHaveBeenCalledWith({ userId });
    expect(result).toEqual(existingProfile);
  });

  it('should return null when no profile exists for a user', async () => {
    const userId = 'non-existing-user-id';
    profileRepo.findOneBy = jest.fn().mockResolvedValue(null);

    const result = await service.findProfileForUser(userId);

    expect(profileRepo.findOneBy).toHaveBeenCalledWith({ userId });
    expect(result).toBeNull();
  });

  it('should be able to update the profile subscription status', async () => {
    const userId = 'user-id';
    const profile = profileFactory.build({ subscriptionEndDate: null, userId });
    const numberOfDaysToAdd = 60;

    profileRepo.findOneBy = jest.fn().mockResolvedValue({ ...profile });

    const returnSubscriptionEndDate = dayjs()
      .add(numberOfDaysToAdd, 'day')
      .toDate();
    profileRepo.save = jest.fn().mockResolvedValue({
      ...profile,
      subscriptionEndDate: returnSubscriptionEndDate,
    } as Profile);

    const result = await service.addDaysToSubscription(
      userId,
      profile.id,
      numberOfDaysToAdd,
    );

    expect(profileRepo.save).toHaveBeenCalled();
    expect(result.subscriptionEndDate.toISOString()).toBe(
      returnSubscriptionEndDate.toISOString(),
    );
  });

  it('should throw entitynotfound error, If profile does not exist', async () => {
    profileRepo.findOneBy = jest.fn().mockResolvedValue(null);

    let error;
    try {
      await service.addDaysToSubscription('test-user', 999, 60);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(NotFoundException);
  });

  it('should throw error if the user id trying to change it does not own profile', async () => {
    const userId = 'user-id';
    const profile = profileFactory.build({ subscriptionEndDate: null });

    profileRepo.findOneBy = jest.fn().mockResolvedValue({ ...profile });

    let error;
    try {
      await service.addDaysToSubscription(userId, profile.id, 60);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(UnauthorizedException);
  });

  it('should throw error if user already has subscription end date', async () => {
    const profile = profileFactory.build();

    profileRepo.findOneBy = jest.fn().mockResolvedValue({ ...profile });

    let error;
    try {
      await service.addDaysToSubscription(profile.userId, profile.id, 60);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(UnauthorizedException);
  });
});
