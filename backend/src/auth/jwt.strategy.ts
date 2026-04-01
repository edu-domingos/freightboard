import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { Algorithm } from 'jsonwebtoken';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { JwtType } from './jwt-type.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      ignoreExpiration: false,
      algorithms: [configService.getOrThrow<Algorithm>('JWT_ALGORITHM')],
      audience: configService.getOrThrow<string>('JWT_AUDIENCE'),
      issuer: configService.getOrThrow<string>('JWT_ISSUER'),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.type !== JwtType.ACCESS) {
      throw new UnauthorizedException();
    }

    const key = `user:${payload.sub}`;

    let user = await this.cacheManager.get(key);

    if (!user) {
      user = await this.usersService.findById(payload.sub);

      if (!user) throw new UnauthorizedException();

      await this.cacheManager.set(key, user, 60);
    }

    return user;
  }
}
