import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

global.beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  global.app = moduleFixture.createNestApplication();
  await global.app.init();
});
