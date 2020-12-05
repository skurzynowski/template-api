import { Provider } from '@nestjs/common';
import Joi from 'joi';

import { VALIDATOR_CLIENT_TOKEN } from './constants';
import { ValidatorClient } from './interfaces/validator-client';

export const validatorClientProvider: Provider = {
  provide: VALIDATOR_CLIENT_TOKEN,
  useFactory: (): ValidatorClient => {
    return Joi;
  },
};
