import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  });

  await app.register(fastifyStatic, {
    root: join(__dirname, '../uploads'),
    prefix: '/uploads/',
  });

  const configService = app.get(ConfigService);
  const port = Number(configService.get<number>('PORT'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(port, '0.0.0.0');
}
void bootstrap();
