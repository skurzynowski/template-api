import { Provider } from '@nestjs/common';

import { EnvParserService } from '@shared/env/services/env-parser/env-parser';
import { FileSystemService } from '@shared/file-system/services/main/main';

import { ENV_VARIABLES_TOKEN } from './constants';
import { EnvVariables } from './interfaces/env-variables';

export const envVariablesProvider: Provider = {
  provide: ENV_VARIABLES_TOKEN,
  useFactory: async (
    envParserService: EnvParserService,
    fileSystemService: FileSystemService,
  ): Promise<EnvVariables> => {
    const envVariablesFromEnvFile = await fileSystemService.parseEnvFile();
    const appVersion = await envParserService.getAppVersionFromPackage();

    return {
      ...envVariablesFromEnvFile,
      ...process.env,
      APP_VERSION: appVersion,
    };
  },
  inject: [EnvParserService, FileSystemService],
};
