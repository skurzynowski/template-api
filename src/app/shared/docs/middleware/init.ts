import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { EnvConfigService } from '@shared/env/services/config/config';

export const initDocumentation = (app: INestApplication): INestApplication => {
  const configService = app.get(EnvConfigService);

  const { appVersion } = configService.get();

  const options = new DocumentBuilder()
    .setTitle('Converter API')
    .setDescription('The Converter API.')
    .setVersion(appVersion)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  return app;
};
