import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Transformer } from '@shared/transformer/transformer';

export class FillTemplateRequestPayloadDTO {
  @Expose()
  @ApiPropertyOptional({ type: 'boolean' })
  public transformToPdf?: boolean;

  @Expose()
  @ApiProperty({
    type: 'object',
    example: { name: 'john', surname: 'doe', users: [{ name: 'Jack' }, { name: 'Miro' }] },
  })
  public parameters: Record<string, any>;

  public static of = Transformer.createDTOFactory(FillTemplateRequestPayloadDTO);
}
