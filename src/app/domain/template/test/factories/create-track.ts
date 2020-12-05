import { random } from 'faker';

import { TestFactory } from '@shared/test/factory';
import { Template } from '@template/model/entity';

export const createTemplate: TestFactory<Template> = (overrideProps = {}) => {
  return Template.of({
    id: random.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrideProps,
  });
};
