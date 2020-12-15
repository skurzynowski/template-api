import { DNSHealthIndicator, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthReadinessController } from './readiness';

class HealthCheckServiceFake {
  public async check(): Promise<void> {}
}

class DNSHealthIndicatorFake {
  public async pingCheck(): Promise<void> {}
}

class TypeOrmHealthIndicatorFake {
  public async pingCheck(): Promise<void> {}
}

describe('HealthReadinessController', () => {
  let controller: HealthReadinessController;
  let healthCheckService: HealthCheckService;
  let dnsHealthIndicator: DNSHealthIndicator;
  let typeOrmHealthIndicator: TypeOrmHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthReadinessController],
      providers: [
        {
          provide: HealthCheckService,
          useClass: HealthCheckServiceFake,
        },
        {
          provide: DNSHealthIndicator,
          useClass: DNSHealthIndicatorFake,
        },
        {
          provide: TypeOrmHealthIndicator,
          useClass: TypeOrmHealthIndicatorFake,
        },
      ],
    }).compile();

    controller = module.get(HealthReadinessController);
    healthCheckService = module.get(HealthCheckService);
    dnsHealthIndicator = module.get(DNSHealthIndicator);
    typeOrmHealthIndicator = module.get(TypeOrmHealthIndicator);
  });

  describe('perform a health check', () => {
    it('calls the health indicators', async () => {
      const healthCheckServiceCheckSpy = jest.spyOn(healthCheckService, 'check').mockResolvedValue(null);
      const dnsHealthIndicatorPingCheckSpy = jest.spyOn(dnsHealthIndicator, 'pingCheck').mockResolvedValue(null);
      const typeOrmHealthIndicatorPingCheckSpy = jest
        .spyOn(typeOrmHealthIndicator, 'pingCheck')
        .mockResolvedValue(null);

      const result = await controller.handle();

      expect(result).toBe(null);
      expect(healthCheckServiceCheckSpy).toHaveBeenCalledWith([expect.any(Function), expect.any(Function)]);

      const checkFunctions = healthCheckServiceCheckSpy.mock.calls[0][0];

      await Promise.all(checkFunctions.map((fn) => fn()));

      expect(dnsHealthIndicatorPingCheckSpy).toHaveBeenCalledWith('dns', 'https://www.google.com');
      expect(typeOrmHealthIndicatorPingCheckSpy).toHaveBeenCalledWith('database', { timeout: 3000 });
    });
  });
});
