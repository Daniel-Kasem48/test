import { ISendMailOptions } from '@nestjs-modules/mailer';


export abstract class BaseMailTemplate {
  protected options: ISendMailOptions;

  constructor() {
    this.options = {};
    this.options = { context: {  } } as ISendMailOptions;
  }

  getOptions() {
    return this.options;
  }

  setOptions(options: ISendMailOptions) {
    this.options = options;
  }
}
