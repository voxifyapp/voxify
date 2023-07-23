import { Body, Controller, Post, Req } from '@nestjs/common';
import {
  AddDaysToSubscriptionDto,
  SetProficiencyLevelDto,
} from 'src/auth/profile/dto/update-profile.dto';
import {
  AuthenticatedRequest,
  AuthenticatedRequestWithProfile,
} from 'src/common/request';
import { ProfileService } from './profile.service';

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
    const { currentProfile } = req;
    const { freeTrialDays } = updateProfileDto;
    return this.profileService.addDaysToSubscription(
      currentProfile.id,
      freeTrialDays,
    );
  }

  @Post('set-proficiency-level')
  setProficiencyLevel(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body() updateProfileDto: SetProficiencyLevelDto,
  ) {
    const { currentProfile } = req;
    const { proficiencyLevel } = updateProfileDto;
    return this.profileService.setProficiencyLevel(
      currentProfile.id,
      proficiencyLevel,
    );
  }
}
