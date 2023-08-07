import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { datasourceConfig } from 'src/typeorm.config';
import { LmsModule } from './lms/lms.module';
import { LmsProgressModule } from './lms-progress/lms-progress.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...datasourceConfig,
    }),
    AuthModule,
    LmsModule,
    LmsProgressModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    { provide: APP_GUARD, useExisting: AuthGuard },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
