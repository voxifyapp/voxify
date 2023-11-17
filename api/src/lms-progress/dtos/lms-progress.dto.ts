import { IsEnum, IsUUID } from 'class-validator';
import { LessonResponseStatus } from 'src/lms-progress/entities/lesson-response.entity';

export class CreateLessonResponseDto {
  @IsUUID()
  lessonId: string;

  @IsEnum(LessonResponseStatus)
  status: LessonResponseStatus;
}

export class CreateUnitResponseDto {
  @IsUUID()
  unitId: string;
}
