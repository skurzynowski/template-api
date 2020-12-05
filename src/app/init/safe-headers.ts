import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const initSafeHeaders = (app: INestApplication): INestApplication => {
  app.use(helmet());

  return app;
};
