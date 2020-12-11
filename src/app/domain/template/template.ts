import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@auth/auth';

import { TemplateCreateOneController } from './api/controllers/create-one/create-one';
import { TemplateGetManyController } from './api/controllers/get-many/get-many';
import { TemplateGetOneController } from './api/controllers/get-one/get-one';
import { TemplateRemoveOneController } from './api/controllers/remove-one/remove-one';
import { Template } from './model/entity';
import { TemplateCreateService } from './services/create/create';
import { TemplateFileTypeValidatorService } from './services/file-type-validator/file-type-validator';
import { TemplateFindService } from './services/find/find';
import { TemplateRemoveService } from './services/remove/remove';
import { TemplateTransformController } from './api/controllers/transform/transform';
import { TemplateTransformService } from './services/transform/transform';
import { FileSystemService } from '@shared/file-system/services/main/main';

@Module({
  imports: [TypeOrmModule.forFeature([Template]), AuthModule, FileSystemService],
  controllers: [
    TemplateCreateOneController,
    TemplateGetManyController,
    TemplateGetOneController,
    TemplateRemoveOneController,
    TemplateTransformController,
  ],
  providers: [
    TemplateFindService,
    TemplateCreateService,
    TemplateRemoveService,
    TemplateFileTypeValidatorService,
    TemplateTransformService,
    FileSystemService
  ],
  exports: [TypeOrmModule, TemplateFindService, TemplateCreateService, TemplateRemoveService, TemplateTransformService],
})
export class TemplateModule {}
