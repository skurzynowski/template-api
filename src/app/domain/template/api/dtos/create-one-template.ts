import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Transformer } from '@shared/transformer/transformer';

import { SerializedTemplateDTO } from './serialized-template';

export class CreateOneTemplateResponsePayloadDTO {
  @Expose()
  @ApiProperty({
    description: 'The created template.',
    type: SerializedTemplateDTO,
  })
  public template: SerializedTemplateDTO;

  public static of = Transformer.createDTOFactory(CreateOneTemplateResponsePayloadDTO);
}
