import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/admin/admin.guard';
import { CourseService } from 'src/admin/services/course.service';

@Controller('admin/course/')
@UseGuards(AdminGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll() {
    return await this.courseService.getCourses();
  }
}
