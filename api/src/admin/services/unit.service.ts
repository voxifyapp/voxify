import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/lms/entities/unit.entity';
import { Repository } from 'typeorm';

export type UpdatableUnitFields = Partial<
  Pick<Unit, 'title' | 'courseId' | 'order' | 'published'>
>;
@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit) private unitRepository: Repository<Unit>,
  ) {}

  async getUnits({ courseId }: { courseId?: string }) {
    return await this.unitRepository.find({
      where: {
        courseId,
      },
      relations: { course: true },
      order: courseId ? { order: 'ASC' } : { createdAt: 'DESC' },
      withDeleted: true,
    });
  }

  async getUnitById(unitId: string) {
    return await this.unitRepository.findOneBy({ id: unitId });
  }

  async createUnit({
    title,
    order,
    courseId,
  }: Pick<Unit, 'title' | 'order' | 'courseId'>) {
    return await this.unitRepository.save({
      title,
      order,
      courseId,
    });
  }

  async updateUnit(
    activityId: string,
    data: UpdatableUnitFields,
  ): Promise<Unit> {
    return await this.unitRepository.save({
      id: activityId,
      ...data,
    });
  }
}
