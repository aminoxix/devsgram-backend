import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove not defined properties & save server to get any unwanted data
    }),
  ); // important: dto won't work, for validation
  await app.listen(8000);
}
bootstrap();
