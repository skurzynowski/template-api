import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth';
import { HealthModule } from './health/health';
import { TemplateModule } from './template/template';

@Module({
  imports: [HealthModule, TemplateModule, AuthModule],
  exports: [HealthModule, TemplateModule, AuthModule],
})
export class DomainModule {}
