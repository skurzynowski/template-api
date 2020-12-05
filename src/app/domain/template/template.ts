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

@Module({
  imports: [TypeOrmModule.forFeature([Template]), AuthModule],
  controllers: [
    TemplateCreateOneController,
    TemplateGetManyController,
    TemplateGetOneController,
    TemplateRemoveOneController,
  ],
  providers: [TemplateFindService, TemplateCreateService, TemplateRemoveService, TemplateFileTypeValidatorService],
  exports: [TypeOrmModule, TemplateFindService, TemplateCreateService, TemplateRemoveService],
})
export class TemplateModule {}
