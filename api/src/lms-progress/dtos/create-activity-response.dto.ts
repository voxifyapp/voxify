import { IsEnum, IsNumber, IsObject, IsUUID } from 'class-validator';
import { ActivityResponseResultType } from 'src/lms-progress/entities/activity-response.entity';

export class CreateActivityResponseDto {
  @IsUUID()
  activityId: string;

  @IsUUID()
  lessonResponseId: string;

  @IsEnum(ActivityResponseResultType)
  result: ActivityResponseResultType;

  // TODO Create proper validations, maybe with zod.
  @IsObject()
  responseData: object;

  @IsNumber()
  timeTaken: number;
}
