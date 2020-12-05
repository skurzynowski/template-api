import { Module } from '@nestjs/common';

import { envVariablesProvider } from './providers/env-variables/env-variables';
import { EnvConfigService } from './services/config/config';
import { EnvParserService } from './services/env-parser/env-parser';

@Module({
  providers: [envVariablesProvider, EnvConfigService, EnvParserService],
  exports: [envVariablesProvider, EnvConfigService, EnvParserService],
})
export class EnvModule {}
