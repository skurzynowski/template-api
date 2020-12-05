import { Inject, Injectable } from '@nestjs/common';
import Joi from 'joi';

import { BaseConfigService } from '@shared/config/config';
import { ENV_VARIABLES_TOKEN } from '@shared/env/providers/env-variables/constants';
import { EnvVariables } from '@shared/env/providers/env-variables/interfaces/env-variables';
import { VALIDATOR_CLIENT_TOKEN } from '@shared/validator/providers/client/constants';
import { ValidatorClient } from '@shared/validator/providers/client/interfaces/validator-client';

import { AuthConfig } from './interfaces/auth-config';
import { AuthEnvVariables } from './interfaces/auth-env-variables';

@Injectable()
export class AuthConfigService extends BaseConfigService<AuthConfig, AuthEnvVariables> {
  public constructor(
    @Inject(VALIDATOR_CLIENT_TOKEN) protected readonly validatorClient: ValidatorClient,
    @Inject(ENV_VARIABLES_TOKEN) envVariables: EnvVariables,
  ) {
    super(validatorClient, envVariables);
  }

  protected createConfig(envVariables: AuthEnvVariables): AuthConfig {
    return {
      allowedSecrets: envVariables.AUTH_SECRETS.split(','),
    };
  }

  protected createSchema(): Joi.ObjectSchema<AuthEnvVariables> {
    return this.validatorClient.object<AuthEnvVariables>({
      AUTH_SECRETS: this.validatorClient.string().required(),
    });
  }
}
