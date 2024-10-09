import { ISendMailOptions } from '@nestjs-modules/mailer';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';

import { BaseMailTemplate } from '../base-mail-template';

export class GeolocationSearchResultMailTemplate extends BaseMailTemplate {
  constructor(
    to: string | Address | Array<string | Address>,
    addressAsString:string,
    lat: string,
    long:string,

  ) {
    super();

    const localOptions: ISendMailOptions = {
      to: to,
      template: "geolocation-search-result",
      subject: "Your Geolocation Search Is",
      context: {
        ...super.getOptions().context,
        addressAsString,
        lat,
        long
      },
    };

    super.setOptions(localOptions);
  }
}
