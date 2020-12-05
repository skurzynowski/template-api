import { INestApplication, ValidationPipe } from '@nestjs/common';

import { EnvConfigService } from '@shared/env/services/config/config';

export const initValidationPipes = (app: INestApplication): INestApplication => {
  const envConfigService = app.get(EnvConfigService);
  const { isProd } = envConfigService.get();

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProd,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  return app;
};
