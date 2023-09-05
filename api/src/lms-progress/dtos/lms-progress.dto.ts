import { IsUUID } from 'class-validator';

export class CreateLessonResponseDto {
  @IsUUID()
  lessonId: string;
}

export class CreateUnitResponseDto {
  @IsUUID()
  unitId: string;
}
