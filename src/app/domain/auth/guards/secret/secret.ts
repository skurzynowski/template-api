import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { InvalidSecretException } from '@auth/exceptions/invalid-secret';
import { AuthConfigService } from '@auth/services/config/config';

export class SecretGuardFake {
  public async canActivate(): Promise<boolean> {
    return true;
  }
}

@Injectable()
export class SecretGuard implements CanActivate {
  public constructor(private readonly authConfigService: AuthConfigService) {}

  private getSecret(token: string): string {
    if (typeof token !== 'string') {
      throw new InvalidSecretException();
    }

    return token.split(' ').pop();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const secret = this.getSecret(request.headers.authorization);

      if (!secret) {
        throw new InvalidSecretException();
      }

      const { allowedSecrets } = this.authConfigService.get();

      if (!allowedSecrets.includes(secret)) {
        throw new InvalidSecretException();
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}
