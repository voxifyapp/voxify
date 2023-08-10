import typeormConfig from 'src/typeorm.config';
import { EntityTarget } from 'typeorm';

export const getTypeormConfig = async () => {
  if (!typeormConfig.isInitialized) await typeormConfig.initialize();

  return typeormConfig;
};

/**
 * To use in tests to interact with the database
 * Get's the repository for an entity
 */
export const getRepository = async <T>(entity: EntityTarget<T>) => {
  return await (await getTypeormConfig()).getRepository(entity);
};
