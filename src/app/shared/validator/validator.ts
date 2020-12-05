import { Module } from '@nestjs/common';

import { validatorClientProvider } from './providers/client/client';

@Module({
  providers: [validatorClientProvider],
  exports: [validatorClientProvider],
})
export class ValidatorModule {}
