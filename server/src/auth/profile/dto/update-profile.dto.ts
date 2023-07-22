import { IsEnum, IsOptional, Max } from 'class-validator';
import { ProficiencyLevel } from 'src/auth/profile/profile.entity';

export class AddDaysToSubscriptionDto {
  @Max(180)
  @IsOptional()
  freeTrialDays?: number;
}

export class SetProficiencyLevelDto {
  @IsOptional()
  @IsEnum(ProficiencyLevel)
  proficiencyLevel?: ProficiencyLevel;
}
