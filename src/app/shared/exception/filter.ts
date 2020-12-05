import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggerService } from '@shared/logger/services/main/main';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public constructor(private readonly loggerService: LoggerService) {}

  public catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      this.loggerService.info('The response of a HttpException.', {
        response: res,
      });

      return response.status(status).send(res);
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      const { name, message, stack } = exception as HttpException;

      this.loggerService.error('An internal server error was thrown during processing of the request.', {
        name,
        message,
        stack,
      });
    } else {
      const { name, message, stack } = exception as HttpException;

      this.loggerService.warn('An exception was thrown during processing of the request.', { name, message, stack });
    }

    return response.status(status).send({
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception,
    });
  }
}
