import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Repository } from 'typeorm';

export const findOneOr404 = async <T extends Repository<BaseEntity>>(
  repo: T,
  id: string,
) => {
  const entity = await repo.findOne({ where: { id } });
  if (!entity) {
    throw new NotFoundException('Entity not found');
  }
  return entity;
};
