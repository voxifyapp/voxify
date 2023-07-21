import { IsOptional, Max } from 'class-validator';

export class AddDaysToSubscriptionDto {
  @Max(180)
  @IsOptional()
  freeTrialDays?: number;
}
