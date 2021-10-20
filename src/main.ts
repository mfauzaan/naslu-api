import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  // Set Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: 422,
      whitelist: true,
    }),
  );
  await app.listen(process.env.APP_PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
