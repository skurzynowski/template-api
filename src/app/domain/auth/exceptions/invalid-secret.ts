import { ForbiddenException } from '@nestjs/common';

export class InvalidSecretException extends ForbiddenException {
  public static createErrorMessage(): string {
    return 'Invalid secret.';
  }

  public constructor() {
    super(InvalidSecretException.createErrorMessage());
  }
}
