import { IsOptional, IsString } from 'class-validator';

export class EnrollToCourseDto {
  @IsString()
  courseId: string;
}
