import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /** Gera um access token */
  signAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: this.config.get<number>('JWT_EXPIRES_IN'),
      issuer: this.config.get<string>('JWT_ISSUER'),
      audience: this.config.get<string>('JWT_AUDIENCE'),
    });
  }

  /** Gera um refresh token */
  signRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: this.config.get<number>('JWT_REFRESH_EXPIRES_IN'),
      issuer: this.config.get<string>('JWT_ISSUER'),
      audience: this.config.get<string>('JWT_AUDIENCE'),
    });
  }

  /** Verifica token (access ou refresh) */
  verifyToken(token: string): TokenPayload | null {
    try {
      return this.jwtService.verify<TokenPayload>(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });
    } catch {
      return null;
    }
  }

  /** Decodifica token sem verificar assinatura */
  decodeToken(token: string): TokenPayload | null {
    const decoded: unknown = this.jwtService.decode(token);

    if (!decoded || typeof decoded !== 'object') {
      return null;
    }

    return decoded as TokenPayload;
  }
}
