import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('token is empty');
    }

    const payload = this.tokenService.verifyToken(token);

    if (!payload || !payload.sub) {
      throw new UnauthorizedException('');
    }

    const user = await this.usersService.findById(payload.sub);

    request.user = user;

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization'];

    if (!authorization || typeof authorization !== 'string') {
      return;
    }

    return authorization.split(' ')[1];
  }
}
