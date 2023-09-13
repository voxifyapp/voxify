import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons({ courseId }: { courseId?: string }) {
    return await this.lessonRepository.find({
      where: {},
    });
  }
}
