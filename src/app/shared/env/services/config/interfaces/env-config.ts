import { EnvEnvVariables } from './env-env-variables';

export interface EnvConfig {
  readonly isDev: boolean;
  readonly isProd: boolean;
  readonly isTest: boolean;
  readonly env: EnvEnvVariables['NODE_ENV'];
  readonly appVersion: EnvEnvVariables['APP_VERSION'];
  readonly frontendUrl: EnvEnvVariables['BACKEND_URL'];
  readonly backendUrl: EnvEnvVariables['FRONTEND_URL'];
  readonly port: EnvEnvVariables['PORT'];
  readonly host: EnvEnvVariables['HOST'];
}
