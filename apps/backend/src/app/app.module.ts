import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { TypeormConfigService } from './persistence/typeorm-config.service';
import { GeolocationModule } from './geolocation/geolocation.module';
import { environment } from '../environments/environment';
import { MailModule } from './mail/mail.module';
import { ExceptionFilter } from './exception-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => environment],
      isGlobal: true,
    }),
    MailModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    GeolocationModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
