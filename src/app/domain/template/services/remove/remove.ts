import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoggerService } from '@shared/logger/services/main/main';
import { Template } from '@template/model/entity';
import { TemplateRepository } from '@template/model/repository';
import { TemplateFindService } from '@template/services/find/find';

import { RemoveOneTemplateParams } from './interfaces/remove-one-template-params';

export class TemplateRemoveServiceFake {
  public async removeOne(): Promise<void> {}
}

@Injectable()
export class TemplateRemoveService {
  public constructor(
    @InjectRepository(Template) private readonly templateRepository: TemplateRepository,
    private readonly templateFindService: TemplateFindService,
    private readonly loggerService: LoggerService,
  ) {}

  public async removeOne(params: RemoveOneTemplateParams): Promise<void> {
    const { templateData } = params;

    const template = await this.templateFindService.findOneOrFail(templateData.id);

    await this.templateRepository.remove([template]);

    this.loggerService.info('Template removed.', {
      id: template.id,
    });

    return null;
  }
}
