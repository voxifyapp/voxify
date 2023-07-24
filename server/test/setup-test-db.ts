import typeormConfig from 'src/typeorm.config';
import { getTypeormConfig } from 'test/utils/typeorm';

global.beforeAll(async () => {
  const connection = await typeormConfig.initialize();
  await connection.runMigrations();
  await connection.destroy();
});

global.afterEach(async () => {
  // Fetch all the entities
  const entities = (await getTypeormConfig()).entityMetadatas;

  for (const entity of entities) {
    const repository = (await getTypeormConfig()).getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
});
