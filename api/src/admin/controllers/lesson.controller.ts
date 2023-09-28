import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/admin/admin.guard';
import { LessonService } from 'src/admin/services/lesson.service';
import { DoesNotRequireProfile } from 'src/common/decorators/auth';
import { Lesson } from 'src/lms/entities/Lesson.entity';

@Controller('admin/lessons/')
@DoesNotRequireProfile()
@UseGuards(AdminGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async findAll(@Query('unitId') unitId?: string) {
    return await this.lessonService.getLessons({ unitId });
  }

  @Post()
  async create(@Body() lesson: Pick<Lesson, 'title' | 'order' | 'unitId'>) {
    return await this.lessonService.createLesson(lesson);
  }

  @Get(':lessonId')
  async getLessonById(@Param('lessonId') lessonId: string) {
    return await this.lessonService.getLessonById(lessonId);
  }

  @Patch(':lessonId')
  async update(
    @Param('lessonId') lessonId: string,
    @Body() lesson: Pick<Lesson, 'title' | 'unitId' | 'order'>,
  ) {
    return await this.lessonService.updateLesson(lessonId, lesson);
  }
}
