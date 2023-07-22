import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  AuthenticatedRequest,
  AuthenticatedRequestWithProfile,
} from 'src/common/request';
import { ProfileService } from './profile.service';
import {
  AddDaysToSubscriptionDto,
  SetProficiencyLevelDto,
} from 'src/auth/profile/dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Req() req: AuthenticatedRequest) {
    const user = req.firebaseUser;
    return this.profileService.findOrCreate(user.uid);
  }

  @Post('add-days-to-subscription')
  addDaysToSubscription(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body() updateProfileDto: AddDaysToSubscriptionDto,
  ) {
    const { firebaseUser, currentProfile } = req;
    const { freeTrialDays } = updateProfileDto;
    return this.profileService.addDaysToSubscription(
      firebaseUser.uid,
      currentProfile.id,
      freeTrialDays,
    );
  }

  @Post('set-proficiency-level')
  setProficiencyLevel(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body() updateProfileDto: SetProficiencyLevelDto,
  ) {
    const { firebaseUser, currentProfile } = req;
    const { proficiencyLevel } = updateProfileDto;
    return this.profileService.setProficiencyLevel(
      firebaseUser.uid,
      currentProfile.id,
      proficiencyLevel,
    );
  }
}
