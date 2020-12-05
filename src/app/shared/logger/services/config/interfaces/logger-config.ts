import { LoggerEnvVariables } from './logger-env-variables';

export interface LoggerConfig {
  readonly isExtreme: LoggerEnvVariables['LOGGER_IS_EXTREME'];
  readonly logLevel: LoggerEnvVariables['LOGGER_LOG_LEVEL'];
}
