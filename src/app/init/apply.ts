import { INestApplication } from '@nestjs/common';

export type Initializer = (app: INestApplication) => INestApplication;

export const withInitializers = (...initializers: Initializer[]) => (app: INestApplication): INestApplication =>
  initializers.reduce((app, init) => init(app), app);
