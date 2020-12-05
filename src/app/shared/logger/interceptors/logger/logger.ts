import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoggerService } from '../../services/main/main';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  public constructor(private readonly loggerService: LoggerService) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestStartTime = Date.now();

    const httpContext = context.switchToHttp();
    const request: Request = httpContext.getRequest();
    const response: Response = httpContext.getResponse();

    return next.handle().pipe(
      tap(() => {
        const processingTime = Date.now() - requestStartTime;

        this.loggerService.info('Request finished processing.', {
          method: request.method,
          path: request.url,
          statusCode: response.statusCode,
          processingTime,
        });
      }),
    );
  }
}
