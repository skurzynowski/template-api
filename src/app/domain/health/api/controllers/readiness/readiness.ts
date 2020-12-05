import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { HEALTH_API_TAGS } from '@health/api/constants/documentation';
import { HEALTH_READINESS_CHECK_ENDPOINT } from '@health/api/constants/endpoints';

@ApiTags(HEALTH_API_TAGS)
@Controller(HEALTH_READINESS_CHECK_ENDPOINT)
export class HealthReadinessController {
  public constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly dnsHealthIndicator: DNSHealthIndicator,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @HealthCheck()
  public handle(): Promise<any> {
    return this.healthCheckService.check([
      async (): Promise<HealthIndicatorResult> => this.dnsHealthIndicator.pingCheck('dns', 'https://www.google.com'),
      async (): Promise<HealthIndicatorResult> =>
        this.typeOrmHealthIndicator.pingCheck('database', {
          timeout: 3000,
        }),
    ]);
  }
}
