import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Profile } from 'src/auth/profile/profile.entity';
import { ProfileRepository } from 'src/auth/profile/profile.repository';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  /**
   * We create a new profile if one does not exist for the user,
   * if it already exists for the user we return that and ignore the createProfileDto
   */
  async findOrCreate(userId: string) {
    const existingProfileForUser = this.profileRepository.findOne({
      where: { userId: userId },
    });
    return (
      existingProfileForUser ||
      (await this.profileRepository.create({ userId }))
    );
  }

  async findProfileForUser(userId: string) {
    return await this.profileRepository.findOneBy({ userId });
  }

  /**
   * Throws error if user does not have access to profile
   */
  async requireUserToHaveAccessToProfile(
    userId: string,
    {
      profileId,
      profile: passedProfile,
    }: { profileId?: number; profile?: Profile },
  ) {
    const profile =
      passedProfile ||
      (await this.profileRepository.findOneBy({ id: profileId }));

    if (profile.userId !== userId)
      throw new UnauthorizedException({ userId, profileId: profile.id });
  }

  /**
   * Add days to subscription if there is no current subscription
   */
  async addDaysToSubscription(
    userId: string,
    profileId: number,
    daysToAdd: number,
  ) {
    const profile = await this.profileRepository.findOneBy({ id: profileId });

    if (!profile) throw new NotFoundException({ profileId });

    await this.requireUserToHaveAccessToProfile(userId, { profile });

    profile.subscriptionEndDate = dayjs().add(daysToAdd, 'days').toDate();
    return await this.profileRepository.save(profile);
  }
}
