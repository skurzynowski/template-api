import { Module } from '@nestjs/common';

import { LoggerConfigService } from './services/config/config';
import { LoggerService } from './services/main/main';

@Module({
  providers: [LoggerConfigService, LoggerService],
  exports: [LoggerConfigService, LoggerService],
})
export class LoggerModule {}
