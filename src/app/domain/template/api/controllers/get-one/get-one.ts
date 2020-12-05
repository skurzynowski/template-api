import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SecretGuard } from '@auth/guards/secret/secret';
import { ApiGetOneResponseSuccess } from '@shared/docs/responses';
import { ParseUUIDV4Pipe } from '@shared/pipes/uuid-v4';
import { TEMPLATE_API_TAGS } from '@template/api/constants/documentation';
import { TEMPLATE_GET_ONE_ENDPOINT } from '@template/api/constants/endpoints';
import { TEMPLATE_ID_PARAM } from '@template/api/constants/params';
import { GetOneTemplateResponsePayloadDTO } from '@template/api/dtos/get-one-template';
import { TemplateFindService } from '@template/services/find/find';

@ApiTags(TEMPLATE_API_TAGS)
@Controller(TEMPLATE_GET_ONE_ENDPOINT)
export class TemplateGetOneController {
  public constructor(private readonly templateFindService: TemplateFindService) {}

  @ApiOperation({
    summary: 'Get a template.',
  })
  @ApiGetOneResponseSuccess({
    type: GetOneTemplateResponsePayloadDTO,
  })
  @UseGuards(SecretGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get()
  public async handle(
    @Param(TEMPLATE_ID_PARAM, ParseUUIDV4Pipe) templateId: string,
  ): Promise<GetOneTemplateResponsePayloadDTO> {
    const template = await this.templateFindService.findOneOrFail(templateId);

    return {
      template,
    };
  }
}
