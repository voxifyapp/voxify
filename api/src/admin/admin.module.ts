import { Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/lms/entities/course.entity';
import { CourseService } from 'src/admin/services/course.service';
import { AdminProfileService } from './services/admin-profile.service';
import { AdminProfile } from 'src/admin/entities/admin-profile.entity';

@Module({
  controllers: [CourseController],
  providers: [CourseService, AdminProfileService],
  imports: [TypeOrmModule.forFeature([Course, AdminProfile])],
})
export class AdminModule {}
