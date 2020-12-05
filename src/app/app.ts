import { Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpExceptionFilter } from '@shared/exception/filter';
import { LoggerInterceptor } from '@shared/logger/interceptors/logger/logger';

import { DomainModule } from './domain/domain';
import { SharedModule } from './shared/shared';

const globalProviders: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];

@Module({
  imports: [SharedModule, DomainModule],
  providers: [...globalProviders],
})
export class AppModule {}
