import { Expose } from 'class-transformer';

import { ApiCreatedAtProperty, ApiUpdatedAtProperty } from '@shared/docs/properties';
import { Transformer } from '@shared/transformer/transformer';

import { ApiFileTypeProperty, ApiIdProperty } from '../docs/properties';

export class SerializedTemplateDTO {
  @Expose()
  @ApiIdProperty()
  public readonly id: string;

  @Expose()
  @ApiCreatedAtProperty()
  public readonly createdAt: Date;

  @Expose()
  @ApiUpdatedAtProperty()
  public readonly updatedAt: Date;

  @Expose()
  @ApiFileTypeProperty()
  public readonly fileType: string;

  public static of = Transformer.createDTOFactory(SerializedTemplateDTO);
}
