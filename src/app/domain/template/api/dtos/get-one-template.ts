import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Transformer } from '@shared/transformer/transformer';

import { SerializedTemplateDTO } from './serialized-template';

export class GetOneTemplateResponsePayloadDTO {
  @Expose()
  @ApiProperty({
    description: 'The fetched template.',
    type: SerializedTemplateDTO,
  })
  public template: SerializedTemplateDTO;

  public static of = Transformer.createDTOFactory(GetOneTemplateResponsePayloadDTO);
}
