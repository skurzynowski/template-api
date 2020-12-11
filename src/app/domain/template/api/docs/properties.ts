import { createApiIdProperty, createApiProperty } from '@shared/docs/properties';

export const ApiIdProperty = createApiIdProperty({
  description: 'The id of the template.',
});

export const ApiFileTypeProperty = createApiProperty({
  description: 'The file type of the template.',
  type: String,
  example: 'PPTX',
});

export const ApiTemplatePropsTypeProperty = createApiProperty({
  description: 'Values to fill template',
  type: Object,
  example: {},
});
