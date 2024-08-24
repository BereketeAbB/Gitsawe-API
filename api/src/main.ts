import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    cors: true,
  });


  app.enableCors();

  const port: number = Number(process.env.PORT) || 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('api');

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: 'none',
    },
  };

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Gitsawe  API')
      .setDescription('Gitsawe API')
      .addServer(
        process.env.BASE_URL ?? 'http://localhost:3000/',
        'Local environment',
      )
      .setVersion(process.env.VERSION ?? '2.0.0')
      .addBearerAuth()
      .build(),
  );

  SwaggerModule.setup('docs', app, document, customOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port, () => {
    console.log('[WEB]', (process.env.BASE_URL || "http://l:3000") + '/docs');
  });
}

bootstrap();
