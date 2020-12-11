import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SecretGuard } from '@auth/guards/secret/secret';
import { ApiCreateOneResponseSuccess } from '@shared/docs/responses';
import { TEMPLATE_API_TAGS } from '@template/api/constants/documentation';
import { TEMPLATE_CREATE_ONE_ENDPOINT } from '@template/api/constants/endpoints';
import { CreateOneTemplateResponsePayloadDTO } from '@template/api/dtos/create-one-template';
import { TemplateCreateService } from '@template/services/create/create';
import { TemplateFileTypeValidatorService } from '@template/services/file-type-validator/file-type-validator';

@ApiTags(TEMPLATE_API_TAGS)
@Controller(TEMPLATE_CREATE_ONE_ENDPOINT)
export class TemplateCreateOneController {
  public constructor(
    private readonly templateCreateService: TemplateCreateService,
    private readonly templateFileTypeValidatorService: TemplateFileTypeValidatorService,
  ) {}

  @ApiOperation({
    summary: 'Create a template.',
  })
  @ApiCreateOneResponseSuccess({
    type: CreateOneTemplateResponsePayloadDTO,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @UseGuards(SecretGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async handle(@UploadedFile() file: any): Promise<CreateOneTemplateResponsePayloadDTO> {
    const fileType = this.templateFileTypeValidatorService.validateAndTransform(file.originalname);

    const template = await this.templateCreateService.createOne({
      templateData: {
        fileType,
        file: file.buffer,
      },
    });

    return {
      template,
    };
  }
}
