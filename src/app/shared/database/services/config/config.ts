import { Inject, Injectable } from '@nestjs/common';
import Joi from 'joi';

import { BaseConfigService } from '@shared/config/config';
import { ENV_VARIABLES_TOKEN } from '@shared/env/providers/env-variables/constants';
import { EnvVariables } from '@shared/env/providers/env-variables/interfaces/env-variables';
import { VALIDATOR_CLIENT_TOKEN } from '@shared/validator/providers/client/constants';
import { ValidatorClient } from '@shared/validator/providers/client/interfaces/validator-client';

interface DatabaseEnvVariables {
  readonly DATABASE_URL: string;
  readonly DATABASE_LOGGING: boolean;
}

export interface DatabaseConfig {
  readonly url: DatabaseEnvVariables['DATABASE_URL'];
  readonly logging: DatabaseEnvVariables['DATABASE_LOGGING'];
  readonly type: 'postgres';
}

@Injectable()
export class DatabaseConfigService extends BaseConfigService<DatabaseConfig, DatabaseEnvVariables> {
  public constructor(
    @Inject(VALIDATOR_CLIENT_TOKEN) protected readonly validatorClient: ValidatorClient,
    @Inject(ENV_VARIABLES_TOKEN) envVariables: EnvVariables,
  ) {
    super(validatorClient, envVariables);
  }

  protected createConfig(envVariables: DatabaseEnvVariables): DatabaseConfig {
    return {
      url: envVariables.DATABASE_URL,
      logging: envVariables.DATABASE_LOGGING,
      type: 'postgres',
    };
  }

  protected createSchema(): Joi.ObjectSchema<DatabaseEnvVariables> {
    return this.validatorClient.object<DatabaseEnvVariables>({
      DATABASE_URL: this.validatorClient.string().required(),
      DATABASE_LOGGING: this.validatorClient.boolean().default(true),
    });
  }
}
