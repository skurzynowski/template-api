import { InjectRepository } from '@nestjs/typeorm';

import { LoggerService } from '@shared/logger/services/main/main';
import { TemplateNotFoundException } from '@template/exceptions/template-not-found';
import { Template } from '@template/model/entity';
import { TemplateRepository } from '@template/model/repository';

export class TemplateFindServiceFake {}

export class TemplateFindService {
  public constructor(
    @InjectRepository(Template) private readonly templateRepository: TemplateRepository,
    private readonly loggerService: LoggerService,
  ) {}

  public async findOneOrFail(id: string): Promise<Template> {
    const template = this.templateRepository.findOne(id);

    if (!template) {
      throw new TemplateNotFoundException();
    }

    this.loggerService.info('Template found', {
      id,
    });

    return template;
  }

  public async findMany(): Promise<Template[]> {
    return this.templateRepository.find();
  }

  public async findManyOnlyInfo(): Promise<Template[]> {
    return this.templateRepository.find({ select: ['fileType', 'id', 'createdAt', 'updatedAt'] });
  }
}
