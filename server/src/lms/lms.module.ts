import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/lms/entities/course.entity';
import { Unit } from 'src/lms/entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Unit])],
})
export class LmsModule {}
