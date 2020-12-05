import { join } from '@shared/utilities/url/join';

export const HEALTH_ROOT_ENDPOINT = '/health';

export const HEALTH_READINESS_CHECK_ENDPOINT = join(HEALTH_ROOT_ENDPOINT);
