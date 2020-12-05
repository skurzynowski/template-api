import { Inject, Injectable } from '@nestjs/common';
import Joi from 'joi';

import { BaseConfigService, BaseConfigServiceFake } from '@shared/config/config';
import { ENV_VARIABLES_TOKEN } from '@shared/env/providers/env-variables/constants';
import { EnvVariables } from '@shared/env/providers/env-variables/interfaces/env-variables';
import { VALIDATOR_CLIENT_TOKEN } from '@shared/validator/providers/client/constants';
import { ValidatorClient } from '@shared/validator/providers/client/interfaces/validator-client';

import { EnvConfig } from './interfaces/env-config';
import { EnvEnvVariables } from './interfaces/env-env-variables';

export class EnvConfigServiceFake extends BaseConfigServiceFake {}

@Injectable()
export class EnvConfigService extends BaseConfigService<EnvConfig, EnvEnvVariables> {
  public constructor(
    @Inject(VALIDATOR_CLIENT_TOKEN) protected readonly validatorClient: ValidatorClient,
    @Inject(ENV_VARIABLES_TOKEN) envVariables: EnvVariables,
  ) {
    super(validatorClient, envVariables);
  }

  protected createConfig(envVariables: EnvEnvVariables): EnvConfig {
    return {
      isDev: envVariables.NODE_ENV === 'development',
      isProd: envVariables.NODE_ENV === 'production',
      isTest: envVariables.NODE_ENV === 'test',
      env: envVariables.NODE_ENV,
      appVersion: envVariables.APP_VERSION,
      frontendUrl: envVariables.FRONTEND_URL,
      backendUrl: `${envVariables.BACKEND_URL}/v${envVariables.API_VERSION}`,
      port: envVariables.PORT,
      host: envVariables.HOST,
    };
  }

  protected createSchema(): Joi.ObjectSchema<EnvEnvVariables> {
    return this.validatorClient.object<EnvEnvVariables>({
      NODE_ENV: this.validatorClient.string().valid('development', 'production', 'test').default('development'),
      APP_VERSION: this.validatorClient.string().required(),
      HOST: this.validatorClient.string().required(),
      PORT: this.validatorClient.number().required(),
      FRONTEND_URL: this.validatorClient.string().required(),
      BACKEND_URL: this.validatorClient.string().required(),
    });
  }
}
