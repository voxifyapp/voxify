import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lms/entities/Lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons({ unitId }: { unitId?: string }) {
    return await this.lessonRepository.find({
      where: { unitId },
      relations: { unit: true },
      withDeleted: true,
    });
  }

  async createLesson({
    title,
    order,
    unitId,
  }: Pick<Lesson, 'title' | 'order' | 'unitId'>) {
    return await this.lessonRepository.save({
      title,
      order,
      unitId,
    });
  }
}
