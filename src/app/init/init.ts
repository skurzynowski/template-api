import { initDocumentation } from '@shared/docs/middleware/init';
import { initLogger } from '@shared/logger/middleware/init';

import { withInitializers } from './apply';
import { initCors } from './cors';
import { initSafeHeaders } from './safe-headers';
import { initValidationPipes } from './validation-pipes';

export const initApplication = withInitializers(
  initLogger,
  initValidationPipes,
  initDocumentation,
  initSafeHeaders,
  initCors,
);
