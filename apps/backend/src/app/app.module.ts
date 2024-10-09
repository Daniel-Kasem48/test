import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TypeormConfigService } from './persistence/typeorm-config.service';
import { GeolocationModule } from './geolocation/geolocation.module';
import { environment } from '../environments/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => environment],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    GeolocationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
