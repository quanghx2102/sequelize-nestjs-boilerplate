import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { validationPipeCustoms } from './config/validationsPipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation pipe custom config
  app.useGlobalPipes(new ValidationPipe(validationPipeCustoms));

  // enable CORS
  app.enableCors();

  // helmet
  app.use(helmet());

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
