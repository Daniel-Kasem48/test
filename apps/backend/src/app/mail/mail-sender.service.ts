import { Injectable } from '@nestjs/common';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { BaseMailTemplate } from './base-mail-template';


export interface IMailSentEvent  {
  data: ISendMailOptions;
}

@Injectable()
export class MailSenderService {
  constructor(
    @InjectQueue("queue")
    private readonly queue:Queue
  ) {}

  async dispatch(
    mails: BaseMailTemplate
  ) {


      const job =
        {
          mailOptions:mails.getOptions(),
          opts: { removeOnComplete: true },
        };
      await this.queue.add(job);
    }
}
