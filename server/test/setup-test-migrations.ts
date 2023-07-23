import typeormConfig from 'src/typeorm.config';

global.beforeAll(async () => {
  const connection = await typeormConfig.initialize();
  await connection.runMigrations();
  await connection.destroy();
});
