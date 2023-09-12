import { Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/lms/entities/course.entity';
import { CourseService } from 'src/admin/services/course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [TypeOrmModule.forFeature([Course])],
})
export class AdminModule {}
