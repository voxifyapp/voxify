import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from 'src/lms/entities/unit.entity';
import { Repository } from 'typeorm';

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
    data: Pick<Unit, 'title' | 'courseId' | 'order'>,
  ): Promise<Unit> {
    return await this.unitRepository.save({
      id: activityId,
      ...data,
    });
  }
}
