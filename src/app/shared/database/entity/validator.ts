import { validate } from 'class-validator';

import { EntityValidationException } from '@shared/exceptions/entity-validation';

export class EntityValidator {
  public static async validateEntity<T>(instance: T): Promise<void> {
    const errors = await validate(instance);

    if (errors.length) {
      throw new EntityValidationException(errors);
    }
  }
}
