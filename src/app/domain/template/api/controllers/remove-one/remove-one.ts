import { Controller, Delete, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SecretGuard } from '@auth/guards/secret/secret';
import { ApiRemoveOneResponseSuccess } from '@shared/docs/responses';
import { ParseUUIDV4Pipe } from '@shared/pipes/uuid-v4';
import { TEMPLATE_API_TAGS } from '@template/api/constants/documentation';
import { TEMPLATE_REMOVE_ONE_ENDPOINT } from '@template/api/constants/endpoints';
import { TEMPLATE_ID_PARAM } from '@template/api/constants/params';
import { TemplateRemoveService } from '@template/services/remove/remove';

@ApiTags(TEMPLATE_API_TAGS)
@Controller(TEMPLATE_REMOVE_ONE_ENDPOINT)
export class TemplateRemoveOneController {
  public constructor(private readonly templateRemoveService: TemplateRemoveService) {}

  @ApiOperation({
    summary: 'Remove the template.',
  })
  @ApiRemoveOneResponseSuccess({
    type: undefined,
  })
  @UseGuards(SecretGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  public async handle(@Param(TEMPLATE_ID_PARAM, ParseUUIDV4Pipe) templateId: string): Promise<void> {
    await this.templateRemoveService.removeOne({
      templateData: {
        id: templateId,
      },
    });
  }
}
