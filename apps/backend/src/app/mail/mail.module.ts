import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as path from 'path';

import { MailSenderService } from './mail-sender.service';
import { MailProcessor } from './mail.processor';
import { BullModule } from '@nestjs/bull';

@Global()
@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: configService.get('mail.service'),
          mailer: configService.get('mail.protocol'),
          host: configService.get('mail.host'),
          port: configService.get('mail.port'),
          from: configService.get('mail.from.address'),
          name: configService.get('mail.from.name'),
          auth: {
            user: configService.get('mail.auth.user'),
            pass: configService.get('mail.auth.pass'),
          },
        },
        defaults: {
          from: 'IT Plus',
        },
        template: {
          dir: path.join(process.cwd(), configService.get('paths.templates')),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailSenderService, MailProcessor],
  exports: [MailSenderService],
})
export class MailModule {}
