import { INestApplication } from '@nestjs/common';
import pino from 'pino';

import { LoggerConfigService } from '@shared/logger/services/config/config';
import { LoggerService } from '@shared/logger/services/main/main';

function safeLoggerExtremeMode(loggerService: LoggerService): void {
  const instance = loggerService.getInstance();

  setInterval(function () {
    instance.flush();
  }, 10000).unref();

  const handler = pino.final(instance, (err, finalLogger, evt) => {
    finalLogger.info(`${evt} caught`);
    if (err) finalLogger.error(err, 'error caused exit');
    process.exit(err ? 1 : 0);
  });

  // catch all the ways node might exit
  process.on('beforeExit', () => handler(null, 'beforeExit'));
  process.on('exit', () => handler(null, 'exit'));
  process.on('uncaughtException', (err) => handler(err, 'uncaughtException'));
  process.on('SIGINT', () => handler(null, 'SIGINT'));
  process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
  process.on('SIGTERM', () => handler(null, 'SIGTERM'));
}

export const initLogger = (app: INestApplication): INestApplication => {
  const loggerConfigService = app.get(LoggerConfigService);
  const loggerService = app.get(LoggerService);

  const { isExtreme } = loggerConfigService.get();

  if (isExtreme) {
    safeLoggerExtremeMode(loggerService);
  }

  return app;
};
