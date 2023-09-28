import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/admin/admin.guard';
import { CourseService } from 'src/admin/services/course.service';
import { DoesNotRequireProfile } from 'src/common/decorators/auth';
import { Course } from 'src/lms/entities/course.entity';

@Controller('admin/courses/')
@DoesNotRequireProfile()
@UseGuards(AdminGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll() {
    return await this.courseService.getCourses();
  }

  @Post()
  async create(@Body() course: Pick<Course, 'title' | 'proficiencyLevel'>) {
    return await this.courseService.createCourse(course);
  }

  @Get(':courseId')
  async getById(@Param('courseId') courseId: string) {
    return await this.courseService.getCourseById(courseId);
  }
}
