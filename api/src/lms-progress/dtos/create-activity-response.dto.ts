import { IsEnum, IsNumber, IsObject, IsUUID } from 'class-validator';
import { ResultType } from 'src/lms-progress/entities/activity-response.entity';

export class CreateActivityResponseDto {
  @IsUUID()
  activityId: string;

  @IsEnum(ResultType)
  result: ResultType;

  @IsObject()
  responseData: object;

  @IsNumber()
  timeTaken: number;
}
