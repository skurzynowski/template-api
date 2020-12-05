import { Injectable } from '@nestjs/common';

import { InvalidFileTypeException } from '@template/exceptions/invalid-file-type';

export class TemplateFileTypeValidatorServiceFake {
  public async validateAndTransform(): Promise<void> {}
}

@Injectable()
export class TemplateFileTypeValidatorService {
  public validateAndTransform(fileType: string): string {
    if (!fileType) {
      throw new InvalidFileTypeException();
    }

    const type = fileType.toLowerCase();

    if (type === 'pptx') {
      return 'PPTX';
    }

    if (type === 'docx') {
      return 'DOCX';
    }

    throw new InvalidFileTypeException();
  }
}
