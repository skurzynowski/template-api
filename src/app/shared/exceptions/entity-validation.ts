import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class EntityValidationException extends BadRequestException {
  public constructor(errors: ValidationError[]) {
    super({
      errors,
      message: 'There was an error while saving the data to the database.',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
