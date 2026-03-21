import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TokenPayload } from '../../interfaces/token-payload.interface';

export const JwtTokenPayload = createParamDecorator(
  (
    data: keyof TokenPayload,
    ctx: ExecutionContext,
  ): TokenPayload[keyof TokenPayload] | TokenPayload | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as TokenPayload | undefined;

    return data ? user?.[data] : user;
  },
);
