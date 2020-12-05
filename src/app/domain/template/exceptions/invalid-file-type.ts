import { NotFoundException } from '@nestjs/common';

export class InvalidFileTypeException extends NotFoundException {
  public static createErrorMessage(): string {
    return 'Invalid file type.';
  }

  public constructor() {
    super(InvalidFileTypeException.createErrorMessage());
  }
}
