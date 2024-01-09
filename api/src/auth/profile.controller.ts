import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  AddDaysToSubscriptionDto,
  SetProficiencyLevelDto,
  UpdateProfileDto,
  updateProfileDtoSchema,
} from 'src/auth/dto/update-profile.dto';
import { DoesNotRequireProfile } from 'src/common/decorators/auth';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipe';
import {
  AuthenticatedRequest,
  AuthenticatedRequestWithProfile,
} from 'src/common/request';
import { ProfileService } from './services/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @HttpCode(200)
  @DoesNotRequireProfile()
  async create(@Req() req: AuthenticatedRequest) {
    const user = req.decodedFirebaseUser;
    const profile = await this.profileService.findOrCreate(user.uid);
    return profile;
  }

  @Get()
  async get(@Req() req: AuthenticatedRequestWithProfile) {
    const { currentProfile } = req;
    return currentProfile;
  }

  @Patch()
  async updateProfile(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body(new ZodValidationPipe(updateProfileDtoSchema))
    updateProfileDto: UpdateProfileDto,
  ) {
    return await this.profileService.updateProfile(
      req.currentProfile.id,
      updateProfileDto,
    );
  }

  @Post('add-days-to-subscription')
  async addDaysToSubscription(
    @Req() req: AuthenticatedRequestWithProfile,
    @Body() updateProfileDto: AddDaysToSubscriptionDto,
  ) {
    const { currentProfile } = req;
    const { freeTrialDays } = updateProfileDto;
    return await this.profileService.addDaysToSubscription(
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
