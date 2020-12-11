import { Controller, Header, Put, HttpCode, HttpStatus, Param, UseGuards, Response, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

import { SecretGuard } from '@auth/guards/secret/secret';
import { ApiGetOneResponseSuccess } from '@shared/docs/responses';
import { ParseUUIDV4Pipe } from '@shared/pipes/uuid-v4';
import { TEMPLATE_API_TAGS } from '@template/api/constants/documentation';
import { TEMPLATE_TRANSFORM_ENDPOINT } from '@template/api/constants/endpoints';
import { TEMPLATE_ID_PARAM } from '@template/api/constants/params';
import { GetOneTemplateResponsePayloadDTO } from '@template/api/dtos/get-one-template';
import { TemplateFindService } from '@template/services/find/find';
import { TemplateTransformService } from '@template/services/transform/transform';

import { FillTemplateRequestPayloadDTO } from '@template/api/dtos/fill-template';

interface RequestPayload {
  transformToPdf?: boolean;
  parameters: Record<string, any>;
}
//@Header('Content-type','application/pdf')
//@Header('Content-Disposition', 'attachment; filename="template.pdf"')
@ApiTags(TEMPLATE_API_TAGS)
@Controller(TEMPLATE_TRANSFORM_ENDPOINT)
export class TemplateTransformController {
  public constructor(
    private readonly templateFindService: TemplateFindService,
    private readonly templateTransformService: TemplateTransformService,
  ) {}

  @ApiOperation({
    summary: 'Fill template with data.',
  })
  @ApiGetOneResponseSuccess({
    type: GetOneTemplateResponsePayloadDTO,
  })
  @ApiBody({
    description: 'Parameters to fill template',
    type: FillTemplateRequestPayloadDTO,
  })
  @UseGuards(SecretGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Disposition', 'attachment; filename="template.docx"')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  @Put()
  public async handle(
    @Param(TEMPLATE_ID_PARAM, ParseUUIDV4Pipe) templateId: string,
    @Body('parameters') parameters: RequestPayload,
    @Body('transformToPdf') transformToPdf: RequestPayload,
    @Response() response,
  ): Promise<Buffer> {
    const template = await this.templateFindService.findOneOrFail(templateId);
    let result;
    result = await this.templateTransformService.fillWithData(template, parameters);

    if (transformToPdf) {
      response.header('Content-type', 'application/pdf');
      response.header('Content-Disposition', 'attachment; filename="template.pdf"');
      result = await this.templateTransformService.generatePdf(result);
    }

    if (template.fileType === "PPTX") {
      response.header('Content-type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
      response.header('Content-Disposition', 'attachment; filename="template.pptx"');
    }

    return response.send(result.file);
  }
}
