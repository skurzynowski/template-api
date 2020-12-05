import { NestFactory } from '@nestjs/core';

import { EnvConfigService } from '@shared/env/services/config/config';
import { LoggerService } from '@shared/logger/services/main/main';

import { AppModule } from './app/app';
import { initApplication } from './app/init/init';

async function startServer(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  initApplication(app);

  const envConfigService = app.get(EnvConfigService);
  const loggerService = app.get(LoggerService);

  const { port, host, appVersion, env } = envConfigService.get();

  await app.listen(port, host, () => {
    loggerService.info('Server is up and running.', {
      appVersion,
      host,
      port,
      env,
    });
  });
}

startServer();
