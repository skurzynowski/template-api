import { Inject, Injectable } from '@nestjs/common';
import Joi from 'joi';

import { BaseConfigService } from '@shared/config/config';
import { ENV_VARIABLES_TOKEN } from '@shared/env/providers/env-variables/constants';
import { EnvVariables } from '@shared/env/providers/env-variables/interfaces/env-variables';
import { VALIDATOR_CLIENT_TOKEN } from '@shared/validator/providers/client/constants';
import { ValidatorClient } from '@shared/validator/providers/client/interfaces/validator-client';

import { LoggerConfig } from './interfaces/logger-config';
import { LoggerEnvVariables } from './interfaces/logger-env-variables';

@Injectable()
export class LoggerConfigService extends BaseConfigService<LoggerConfig, LoggerEnvVariables> {
  public constructor(
    @Inject(VALIDATOR_CLIENT_TOKEN) protected readonly validatorClient: ValidatorClient,
    @Inject(ENV_VARIABLES_TOKEN) envVariables: EnvVariables,
  ) {
    super(validatorClient, envVariables);
  }

  protected createConfig(envVariables: LoggerEnvVariables): LoggerConfig {
    return {
      isExtreme: envVariables.LOGGER_IS_EXTREME,
      logLevel: envVariables.LOGGER_LOG_LEVEL,
    };
  }

  protected createSchema(): Joi.ObjectSchema<LoggerEnvVariables> {
    return this.validatorClient.object<LoggerEnvVariables>({
      LOGGER_IS_EXTREME: this.validatorClient.boolean().default(false),
      LOGGER_LOG_LEVEL: this.validatorClient.number().valid(10, 20, 30, 40, 50, 60).default(10),
    });
  }
}
