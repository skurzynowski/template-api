import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SecretGuard } from '@auth/guards/secret/secret';
import { ApiGetManyResponseSuccess } from '@shared/docs/responses';
import { TEMPLATE_API_TAGS } from '@template/api/constants/documentation';
import { TEMPLATE_GET_MANY_ENDPOINT } from '@template/api/constants/endpoints';
import { GetManyTemplatesResponsePayloadDTO } from '@template/api/dtos/get-many-templates';
import { TemplateFindService } from '@template/services/find/find';

@ApiTags(TEMPLATE_API_TAGS)
@Controller(TEMPLATE_GET_MANY_ENDPOINT)
export class TemplateGetManyController {
  public constructor(private readonly templateFindService: TemplateFindService) {}

  @ApiOperation({
    summary: 'Get many templates.',
  })
  @ApiGetManyResponseSuccess({
    type: GetManyTemplatesResponsePayloadDTO,
  })
  @ApiBearerAuth()
  @UseGuards(SecretGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async handle(): Promise<GetManyTemplatesResponsePayloadDTO> {
    const templates = await this.templateFindService.findManyOnlyInfo();

    return {
      templates,
    };
  }
}
