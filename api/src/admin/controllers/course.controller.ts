import { Controller, Get } from '@nestjs/common';
import { CourseService } from 'src/admin/services/course.service';

@Controller('admin/course/')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll() {
    return await this.courseService.getCourses();
  }
}
