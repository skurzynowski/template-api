import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { EnvConfigService } from '@shared/env/services/config/config';

import { entities } from './entities';
import { migrations } from './migrations';
import { DatabaseConfigService } from './services/config/config';

export const TypeormDatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: (databaseConfigService: DatabaseConfigService, envConfigService: EnvConfigService) => {
    const { url, logging, type } = databaseConfigService.get();

    const { isProd, isTest } = envConfigService.get();

    return {
      entities,
      migrations,
      url,
      type,
      namingStrategy: new SnakeNamingStrategy(),
      logging: !isTest && logging,
      ssl: isProd, // docker-compose postgres does not support SSL
    };
  },
  inject: [DatabaseConfigService, EnvConfigService],
});

@Module({
  imports: [TypeormDatabaseModule],
  providers: [DatabaseConfigService],
  exports: [TypeormDatabaseModule, DatabaseConfigService],
})
export class DatabaseModule {}
