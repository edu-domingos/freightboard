import { User } from 'src/users/entities/user.entity';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}
