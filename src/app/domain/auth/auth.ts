import { Module } from '@nestjs/common';

import { AuthConfigService } from './services/config/config';

@Module({
  providers: [AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthModule {}
