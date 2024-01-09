import { IsEnum, IsOptional, Max } from 'class-validator';
import { ProficiencyLevel } from 'src/auth/entities/profile.entity';
import { MAX_FREE_TRIAL_DAYS } from 'src/common/constants/auth';
import { z } from 'zod';

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

export const updateProfileDtoSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  proficiencyLevel: z.nativeEnum(ProficiencyLevel).optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileDtoSchema>;
