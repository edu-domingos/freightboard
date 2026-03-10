import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades que não estão no obj DTO
      forbidNonWhitelisted: true, // aponta erro pra prop inexistente no DTO
      transform: true, // converte dados dos params da requisição e DTOs
    }),
  );

  const configService = app.get(ConfigService);
  const port: number = configService.getOrThrow<number>('PORT');
  const host: string = configService.getOrThrow<string>('HOST');

  await app.listen(port, host);
  console.log(`🚀 Server running on http://${host}:${port}`);
}
void bootstrap();
