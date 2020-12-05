import { HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

type ApiResponseCreator = (options: ApiResponseOptions) => MethodDecorator;

export function createApiResponse(creator: ApiResponseCreator) {
  return (options: ApiResponseOptions = {}): MethodDecorator => {
    return creator({
      ...options,
    });
  };
}

export const ApiGetOneResponseSuccess = createApiResponse((options) => {
  return ApiOkResponse({
    description: 'The resource has been successfully fetched.',
    ...options,
  });
});

export const ApiGetManyResponseSuccess = createApiResponse((options) => {
  return ApiOkResponse({
    description: 'Resources have been successfully fetched.',
    ...options,
  });
});

export const ApiCreateOneResponseSuccess = createApiResponse((options) => {
  return ApiCreatedResponse({
    description: 'The resource have been successfully created.',
    ...options,
  });
});

export const ApiCreateManyResponseSuccess = createApiResponse((options) => {
  return ApiCreatedResponse({
    description: 'Resources have been successfully created.',
    ...options,
  });
});

export const ApiRemoveManyResponseSuccess = createApiResponse((options) => {
  return ApiCreatedResponse({
    description: 'Resources have been successfully created.',
    ...options,
  });
});

export const ApiUpdateOneResponseSuccess = createApiResponse((options) => {
  return ApiOkResponse({
    description: 'The resource have been successfully updated.',
    ...options,
  });
});

export const ApiRemoveOneResponseSuccess = createApiResponse((options) => {
  return ApiResponse({
    description: 'The resource have been successfully removed.',
    status: HttpStatus.NO_CONTENT,
    ...options,
  });
});
