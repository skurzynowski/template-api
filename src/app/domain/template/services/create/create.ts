import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoggerService } from '@shared/logger/services/main/main';
import { Template } from '@template/model/entity';
import { TemplateRepository } from '@template/model/repository';

import { CreateOneTemplateParams } from './interfaces/create-one-template-params';

export class TemplateCreateServiceFake {
  public async createOne(): Promise<void> {}
}

@Injectable()
export class TemplateCreateService {
  public constructor(
    @InjectRepository(Template) private readonly templateRepository: TemplateRepository,
    private readonly loggerService: LoggerService,
  ) {}

  public async createOne(params: CreateOneTemplateParams): Promise<Omit<Template, 'file'>> {
    const { templateData } = params;

    const templateEntity = this.templateRepository.create({ ...templateData });

    const { file, ...template } = await this.templateRepository.save(templateEntity);

    this.loggerService.info('Template created.', {
      id: template.id,
    });

    return template;
  }
}
