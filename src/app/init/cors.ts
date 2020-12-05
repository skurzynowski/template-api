import { INestApplication } from '@nestjs/common';
import cors from 'cors';

import { EnvConfigService } from '@shared/env/services/config/config';

export const initCors = (app: INestApplication): INestApplication => {
  const envConfigService = app.get(EnvConfigService);

  const { frontendUrl, isProd } = envConfigService.get();

  if (isProd) {
    app.use(cors({ origin: frontendUrl }));
  } else {
    app.use(cors());
  }

  return app;
};
