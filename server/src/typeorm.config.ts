import { ConfigModule } from '@nestjs/config';
import { Profile } from 'src/auth/profile/profile.entity';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// We do this to load the .env file, the same one that will be used by the app
ConfigModule.forRoot();

export const datasourceConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  entities: [Profile],
  migrations: ['src/**/migrations/*.ts'],
};

export default new DataSource({
  ...datasourceConfig,
});
