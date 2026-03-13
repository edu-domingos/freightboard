import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Tipando explicitamente o request
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const csrfHeader = request.headers['x-csrf-token'];
    const csrfCookie = request.cookies['csrf_token'];

    // Validação do CSRF token
    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      throw new ForbiddenException('CSRF token inválido');
    }

    return true;
  }
}
