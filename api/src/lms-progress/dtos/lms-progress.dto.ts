import { IsUUID } from 'class-validator';

export class CreateLessonResponseDto {
  @IsUUID()
  lessonId: string;
}

export class UpdateLessonResponseDto {
  @IsUUID()
  lessonResponseId: string;

  @IsEnum(LessonResponseStatus)
  status: LessonResponseStatus;
}

export class CreateUnitResponseDto {
  @IsUUID()
  unitId: string;
}
