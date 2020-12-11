import { Expose } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityValidator } from '@shared/database/entity/validator';
import { Transformer } from '@shared/transformer/transformer';

import { TEMPLATE_TABLE_NAME } from './constants';

@Entity(TEMPLATE_TABLE_NAME)
export class Template {
  @IsUUID('4')
  @IsOptional()
  @Expose()
  @PrimaryGeneratedColumn({ type: 'uuid' })
  public id: string;

  @IsDate()
  @IsOptional()
  @Expose()
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @IsDate()
  @IsOptional()
  @Expose()
  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  // TODO: enum
  @IsString()
  @Expose()
  @Column({ type: 'text' })
  public fileType: string;

  @Expose()
  @Column({ type: 'bytea' })
  public file: Buffer;

  @BeforeInsert()
  @BeforeUpdate()
  protected validate(): Promise<void> {
    return EntityValidator.validateEntity(this);
  }

  public static of = Transformer.createEntityFactory(Template);
}
