import { faker } from '@faker-js/faker';
import { Factory } from 'fishery';
import { BaseEntity } from 'src/common/entities/base.entity';

export const baseFactory = Factory.define<BaseEntity>(({}) => {
  return {
    createdAt: faker.date.past(),
    id: faker.string.uuid(),
    updatedAt: faker.date.past(),
    version: 1,
  };
});
