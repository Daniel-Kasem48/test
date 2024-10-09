import {
  HttpStatus,
  HttpException,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { isArray } from 'class-validator';


@Catch(HttpException)
export class ExceptionFilter extends BaseExceptionFilter {
  constructor() {
    super();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      const exceptionResponse = exception['response'];

      const statusCode =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      let message =
        exceptionResponse?.message || exception?.message || response.message;

    if(isArray(message)){
      message=message.toString()
    }
      const devErrorResponse: any = {
        statusCode,
        timestamp: new Date().toISOString(),
        errorName: exception?.name,
        message: message,
      };
      response.status(statusCode).json(devErrorResponse);
  }
}
