import Joi from 'joi';

import { EnvVariables } from '@shared/env/providers/env-variables/interfaces/env-variables';
import { ValidatorClient } from '@shared/validator/providers/client/interfaces/validator-client';

export class BaseConfigServiceFake {
  public get(): void {}
}

export abstract class BaseConfigService<T, E> {
  protected abstract createSchema(): Joi.ObjectSchema<E>;

  protected abstract createConfig(validatedEnvVariables: E): T;

  private readonly config: T;

  public constructor(protected validatorClient: ValidatorClient, protected envVariables: EnvVariables) {
    const schema = this.createSchema();

    const { value: validated, error } = schema.validate(envVariables, {
      allowUnknown: true,
    });

    if (error) {
      throw error;
    }

    this.config = this.createConfig(validated);
  }

  public get(): T {
    return this.config;
  }
}
