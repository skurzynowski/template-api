import { join } from '@shared/utilities/url/join';

import { TEMPLATE_ID_ROUTE } from './params';

export const TEMPLATE_ROOT_ENDPOINT = `/templates`;

export const TEMPLATE_CREATE_ONE_ENDPOINT = join(TEMPLATE_ROOT_ENDPOINT);

export const TEMPLATE_GET_ONE_ENDPOINT = join(TEMPLATE_ROOT_ENDPOINT, TEMPLATE_ID_ROUTE);

export const TEMPLATE_REMOVE_ONE_ENDPOINT = join(TEMPLATE_ROOT_ENDPOINT, TEMPLATE_ID_ROUTE);

export const TEMPLATE_GET_MANY_ENDPOINT = join(TEMPLATE_ROOT_ENDPOINT);
