import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/admin/admin.guard';
import { CourseService } from 'src/admin/services/course.service';
import { DoesNotRequireProfile } from 'src/common/decorators/auth';

@Controller('admin/courses/')
@DoesNotRequireProfile()
@UseGuards(AdminGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll() {
    return await this.courseService.getCourses();
  }
}
