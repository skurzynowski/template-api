import { Global, Module } from '@nestjs/common';

import { DatabaseModule } from './database/database';
import { EnvModule } from './env/env';
import { FileSystemModule } from './file-system/file-system';
import { LoggerModule } from './logger/logger';
import { ValidatorModule } from './validator/validator';

@Global()
@Module({
  imports: [ValidatorModule, FileSystemModule, EnvModule, LoggerModule, DatabaseModule],
  exports: [ValidatorModule, FileSystemModule, EnvModule, LoggerModule, DatabaseModule],
})
export class SharedModule {}
