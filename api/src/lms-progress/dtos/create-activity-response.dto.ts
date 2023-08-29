import { IsEnum, IsNumber, IsObject, IsUUID } from 'class-validator';
import { ActivityResponseResultType } from 'src/lms-progress/entities/activity-response.entity';

export class CreateActivityResponseDto {
  @IsUUID()
  activityId: string;

  @IsEnum(ActivityResponseResultType)
  result: ActivityResponseResultType;

  @IsObject()
  responseData: object;

  @IsNumber()
  timeTaken: number;
}
