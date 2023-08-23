import { getRepositoryToken } from '@nestjs/typeorm';
import { Factory, OnCreateFn } from 'fishery';
import { omit } from 'lodash';
import { BaseEntity } from 'src/common/entities/base.entity';
import { getRepository } from 'test/utils/typeorm';
import { EntityTarget } from 'typeorm';

/**
 * Makes the entity that needs to be saved in the onCreate method of fishery
 * Only meant for entities that have a 1-1 relationship
 */
type CreateOnCreateEntityForFixtureParams<T> = {
  entity: T;
  /**
   * Key is the column name of the relationship
   */
  relationships: Partial<Record<keyof T, Factory<BaseEntity>>>;
};
export const createOnCreateEntityForFixture = async <T extends BaseEntity>({
  entity,
  relationships,
}: CreateOnCreateEntityForFixtureParams<T>): Promise<T> => {
  return {
    ...omit(entity, Object.keys(relationships)),
    ...Object.fromEntries(
      await Promise.all(
        Object.entries(relationships).map(async ([key, factory]) => [
          key,
          entity[key] ?? (await factory.create()).id,
        ]),
      ),
    ),
  } as T;
};

/**
 * Quickly create on create function for fishery. This will automatically create associated entities as well (those with 1-1 relationships)
 */
export const listenOnCreateForFixture = <T extends BaseEntity>({
  onCreate,
  relationships,
  Schema,
}: {
  onCreate: (fn: OnCreateFn<T, T>) => any;
  Schema: EntityTarget<T>;
} & Omit<CreateOnCreateEntityForFixtureParams<T>, 'entity'>) => {
  onCreate(async (entity) => {
    const repo = await getRepository(Schema);
    const result = await repo.save(
      await createOnCreateEntityForFixture({ entity, relationships }),
      { reload: true },
    );
    return await repo.findOne({ where: { id: result.id } } as any);
  });
};
