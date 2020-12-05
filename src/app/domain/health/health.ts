import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthReadinessController } from './api/controllers/readiness/readiness';

@Module({
  imports: [TerminusModule],
  controllers: [HealthReadinessController],
})
export class HealthModule {}
