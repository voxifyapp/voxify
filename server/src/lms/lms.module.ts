import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/lms/entities/course.entity';
import { Unit } from 'src/lms/entities/unit.entity';
import { CourseRepository } from 'src/lms/repositories/lms.repository';
import { LmsService } from 'src/lms/services/lms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Unit])],
  providers: [LmsService, CourseRepository],
})
export class LmsModule {}
