import {
  MailerService as ExternalMailer,
  ISendMailOptions,
} from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';

@Processor("queue")
export class MailProcessor {
  constructor(
    private readonly thirdPartyMailer: ExternalMailer,
    private readonly configService: ConfigService
  ) {}

  @Process()
  async send(job: Job) {
    const sendMailOptions = job.data.mailOptions as ISendMailOptions;

    try {
      await this.thirdPartyMailer.sendMail({
        ...sendMailOptions,
        sender: this.configService.get('mail.from.address'),
        from: {
          name: this.configService.get('mail.from.name'),
          address: this.configService.get('mail.from.address'),
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
