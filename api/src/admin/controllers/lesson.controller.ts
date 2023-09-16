import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/admin/admin.guard';
import { LessonService } from 'src/admin/services/lesson.service';
import { DoesNotRequireProfile } from 'src/common/decorators/auth';
import { Lesson } from 'src/lms/entities/Lesson.entity';

@Controller('admin/lessons/')
@DoesNotRequireProfile()
@UseGuards(AdminGuard)
export class LessonController {
  constructor(private readonly LessonService: LessonService) {}

  @Get()
  async findAll(@Query('unitId') unitId?: string) {
    return await this.LessonService.getLessons({ unitId });
  }

  @Post()
  async create(@Body() lesson: Pick<Lesson, 'title' | 'order' | 'unitId'>) {
    return await this.LessonService.createLesson(lesson);
  }
}
