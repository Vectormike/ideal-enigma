import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  setupValidationPipe(app);
  const config = new DocumentBuilder()
    .setTitle('Backend Development task')
    .setDescription('COCUS Portugal Backend Development task')
    .setVersion('1.0')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

function setupValidationPipe(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}
bootstrap();
