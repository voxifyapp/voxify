import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { ProfileRepository } from 'src/auth/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  /**
   * We create a new profile if one does not exist for the user,
   * if it already exists for the user we return that and ignore the createProfileDto
   */
  async findOrCreate(userId: string) {
    const existingProfileForUser = await this.profileRepository.findOne({
      where: { userId: userId },
    });
    return (
      existingProfileForUser ||
      (await this.profileRepository.save({ userId }, { reload: true }))
    );
  }

  async findProfileForUser(userId: string) {
    return await this.profileRepository.findOneBy({ userId });
  }

  /**
   * Add days to subscription if there is no current subscription
   */
  async addDaysToSubscription(profileId: string, daysToAdd: number) {
    const profile = await this.profileRepository.findOneBy({ id: profileId });

    if (!profile) throw new NotFoundException({ profileId });

    if (profile.subscriptionEndDate) {
      throw new ProfileAlreadyHasSubscriptionError(profile.id);
    }

    profile.subscriptionEndDate = dayjs().add(daysToAdd, 'days').toDate();
    return await this.profileRepository.save(profile);
  }

  /**
   * Set proficiency level if not already set
   */
  async setProficiencyLevel(
    profileId: string,
    proficiencyLevel: ProficiencyLevel,
  ) {
    const profile = await this.profileRepository.findOneBy({ id: profileId });

    if (!profile) throw new NotFoundException({ profileId });

    if (profile.proficiencyLevel) {
      throw new ProfileAlreadyHasProficiencyLevelError(profile.id);
    }

    profile.proficiencyLevel = proficiencyLevel;
    return await this.profileRepository.save(profile);
  }
}

// Exceptions
export class ProfileAlreadyHasSubscriptionError extends BadRequestException {
  constructor(profileId) {
    super({ profileId, message: 'Profile already has a subscription' });
  }
}

export class ProfileAlreadyHasProficiencyLevelError extends BadRequestException {
  constructor(profileId) {
    super({ profileId, message: 'Profile already has a proficiency level' });
  }
}
