import { Repository } from 'typeorm';

import { BaseRepositoryFake } from '@shared/database/repository';

import { Template } from './entity';

export class TemplateRepositoryFake extends BaseRepositoryFake {}

export type TemplateRepository = Repository<Template>;
