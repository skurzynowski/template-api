import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import pino from 'pino';

import { EnvConfigService } from '@shared/env/services/config/config';
import { LoggerConfigService } from '@shared/logger/services/config/config';

export enum LogLevel {
  TRACE = 10,
  DEBUG = 20,
  INFO = 30,
  WARN = 40,
  ERROR = 50,
  FATAL = 60,
  SILENT = Infinity,
}

export enum LogMethod {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
  DEBUG = 'debug',
  TRACE = 'trace',
}

export class LoggerServiceFake {
  public getInstance(): pino.Logger {
    return null;
  }

  public log(): void {}

  public info(): void {}

  public error(): void {}

  public warn(): void {}

  public debug(): void {}

  public trace(): void {}
}

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: pino.Logger;

  public constructor(
    private readonly loggerConfigService: LoggerConfigService,
    private readonly envConfigService: EnvConfigService,
  ) {
    const { isProd } = this.envConfigService.get();
    const { isExtreme, logLevel } = this.loggerConfigService.get();

    this.logger = pino({
      prettyPrint: !isProd && {
        colorize: true,
      },
    });

    if (isProd || isExtreme) {
      this.logger = pino(pino.extreme());
    }

    this.logger.level = logLevel;
  }

  public getInstance(): pino.Logger {
    return this.logger;
  }

  private logMessage(methodName: LogMethod, message: string, values: any): void {
    this.logger[methodName].apply(this.logger, [
      {
        ...values,
      },
      message,
    ]);

    return null;
  }

  public log(message: string, values: any = {}): LoggerService {
    this.logMessage(LogMethod.INFO, message, values);

    return this;
  }

  public info(message: string, values: any = {}): LoggerService {
    this.logMessage(LogMethod.INFO, message, values);

    return this;
  }

  public error(message: string, values: any = {}): LoggerService {
    this.logMessage(LogMethod.ERROR, message, values);

    return this;
  }

  public warn(message: string, values: any = {}): LoggerService {
    this.logMessage(LogMethod.WARN, message, values);

    return this;
  }

  public debug(message: string, values: any = {}): LoggerService {
    this.logMessage(LogMethod.DEBUG, message, values);

    return this;
  }

  public trace(message: string, values: any = {}): LoggerService {
    this.logMessage(LogMethod.TRACE, message, values);

    return this;
  }
}
