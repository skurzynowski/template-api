import { NotFoundException } from '@nestjs/common';

export class TemplateNotFoundException extends NotFoundException {
  public static createErrorMessage(): string {
    return 'Template not found.';
  }

  public constructor() {
    super(TemplateNotFoundException.createErrorMessage());
  }
}
