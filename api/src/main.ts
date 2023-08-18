import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureEnv } from 'common/configure-env';

async function bootstrap() {
  configureEnv();
  console.log(process.env)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
