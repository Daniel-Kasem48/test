import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import { GeolocationService } from './geolocation.service';

import { Address } from '../persistence/entities/address';
import { GeolocationController } from './geolocation.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      name: "queue",
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
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
