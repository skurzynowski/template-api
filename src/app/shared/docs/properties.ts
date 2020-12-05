import { ApiProperty, ApiPropertyOptions, ApiQuery } from '@nestjs/swagger';

export function createApiPropertyDecorator(defaultOptions: ApiPropertyOptions = {}) {
  return (options: ApiPropertyOptions = {}): any => {
    return ApiProperty({
      ...defaultOptions,
      ...options,
    });
  };
}

export function createApiProperty(defaultOptions: ApiPropertyOptions = {}): any {
  return createApiPropertyDecorator({
    ...defaultOptions,
  });
}

export function createOptionalApiProperty(defaultOptions: ApiPropertyOptions = {}): any {
  return createApiPropertyDecorator({
    ...defaultOptions,
    required: false,
  });
}

function createBaseApiProperty(baseOptions: ApiPropertyOptions) {
  return (namespaceOptions: ApiPropertyOptions = {}): any =>
    createApiProperty({
      description: 'Default description.', // ?? reminder to be seen in the UI
      ...baseOptions,
      ...namespaceOptions,
    });
}

export const createApiDateProperty = createBaseApiProperty({
  format: 'date-time',
  type: String,
  example: new Date().toJSON(),
});

export const ApiCreatedAtProperty = createApiDateProperty({
  description: 'The date of when the resource was created.',
});

export const ApiUpdatedAtProperty = createApiDateProperty({
  description: 'The date of the most recent resource update.',
});

export const createApiEmailProperty = createBaseApiProperty({
  type: String,
  example: 'example@gmail.com',
});

export const createApiIdProperty = createBaseApiProperty({
  description: 'The id of the resource.',
  type: String,
  format: 'uuid',
  example: 'a0a102b9-68f7-4bf6-99b8-970390c357e2',
});

export const createApiTokenProperty = createBaseApiProperty({
  description: 'A JWT token.',
  type: String,
  example:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
});

// Pagination

const pageSize = ApiQuery({
  name: 'pageSize',
  type: Number,
  description: 'How many records to take. Default: 10',
  example: 10,
});

const page = ApiQuery({
  name: 'page',
  type: Number,
  description: 'How many records to skip (page * pageSize). Default: 1',
  example: 1,
});

const filter = ApiQuery({
  name: 'filter',
  type: [String],
  description: 'The database filtering (WHERE).',
  example: ['price||between||0,1000', 'price||eq||150'],
  required: false,
});

const order = ApiQuery({
  name: 'order',
  type: [String],
  description: 'The database ordering (ORDER BY).',
  example: ['price||ASC', 'distance||DESC'],
  required: false,
});

const searchFieldsDecorators: MethodDecorator[] = [pageSize, page, filter, order];

export function ApiSearchFieldsQueryParams(): MethodDecorator {
  return (target, propertyKey, descriptor): any => {
    return searchFieldsDecorators.reduce((result, decorator) => {
      return decorator(result, propertyKey, descriptor) as TypedPropertyDescriptor<typeof target>;
    }, target);
  };
}
