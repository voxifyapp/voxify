import { IsEnum, IsOptional, Max } from 'class-validator';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { MAX_FREE_TRIAL_DAYS } from 'src/common/constants/auth';

export class AddDaysToSubscriptionDto {
  @Max(MAX_FREE_TRIAL_DAYS)
  @IsOptional()
  freeTrialDays?: number;
}

export class SetProficiencyLevelDto {
  @IsOptional()
  @IsEnum(ProficiencyLevel)
  proficiencyLevel?: ProficiencyLevel;
}
