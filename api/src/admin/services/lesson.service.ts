import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/lms/entities/lesson.entity';
import { Repository } from 'typeorm';

export type UpdatableLessonFields = Partial<
  Pick<Lesson, 'title' | 'order' | 'unitId' | 'published' | 'homeImageFileName'>
>;
@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLessons({ unitId }: { unitId?: string }) {
    return await this.lessonRepository.find({
      where: { unitId },
      relations: { unit: true },
      order: unitId ? { order: 'ASC' } : { createdAt: 'DESC' },
      withDeleted: true,
    });
  }

  async getLessonById(lessonId: string) {
    return await this.lessonRepository.findOneBy({ id: lessonId });
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

  async updateLesson(
    lessonId: string,
    data: UpdatableLessonFields,
  ): Promise<Lesson> {
    return await this.lessonRepository.save({
      id: lessonId,
      ...data,
    });
  }
}
