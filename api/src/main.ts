import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureEnv } from 'common/configure-env';

async function bootstrap() {
  configureEnv();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
