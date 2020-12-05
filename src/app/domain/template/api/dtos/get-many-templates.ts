import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Transformer } from '@shared/transformer/transformer';

import { SerializedTemplateDTO } from './serialized-template';

export class GetManyTemplatesResponsePayloadDTO {
  @Expose()
  @ApiProperty({
    description: 'The fetched templates.',
    type: [SerializedTemplateDTO],
  })
  public templates: SerializedTemplateDTO[];

  public static of = Transformer.createDTOFactory(GetManyTemplatesResponsePayloadDTO);
}
