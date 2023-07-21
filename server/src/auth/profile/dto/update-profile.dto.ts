import { IsEnum, IsOptional, Max } from 'class-validator';
import { ProficiencyLevel } from 'src/auth/profile/profile.entity';

export class UpdateProfileDto {
  @IsEnum(ProficiencyLevel)
  @IsOptional()
  proficiencyLevel?: ProficiencyLevel;

  @Max(180)
  @IsOptional()
  freeTrialDays?: number;
}
