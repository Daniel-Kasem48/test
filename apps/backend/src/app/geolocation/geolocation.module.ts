import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GeolocationService } from './geolocation.service';

import { Address } from '../persistence/entities/address';
import { GeolocationController } from './geolocation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
  ],
  providers: [
    GeolocationService,
  ],
  controllers:[
    GeolocationController,
  ],
  exports: [],
})
export class GeolocationModule {}
