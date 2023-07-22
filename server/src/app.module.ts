import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileModule } from 'src/auth/profile/profile.module';
import { datasourceConfig } from 'src/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...datasourceConfig,
    }),
    AuthModule,
    ProfileModule,
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
