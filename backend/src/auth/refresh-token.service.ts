import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';
import { RefreshTokenRepository } from './refresh-token.repository';
import { JwtPayload } from '../common/jwt/jwt-payload.interface';
import { DeviceInfo } from './interfaces/device-info.interface';
import { JwtTokenService } from '../common/jwt/jwt-token.service';
import { JwtTokenType } from 'src/common/jwt/jwt-token.types';
import { RefreshTokenDocument } from './refresh-token-document';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  /** Cria e salva um refresh token */
  async createRefreshToken(
    userId: string,
    deviceInfo: DeviceInfo,
    expiresInMs: number = 2 * 24 * 60 * 60 * 1000, // 2 dias
  ) {
    const jti = randomUUID();
    const payload: JwtPayload = {
      sub: userId,
      role: 'user',
      jti,
      type: JwtTokenType.REFRESH,
    };
    const refreshToken = this.jwtTokenService.generateRefreshToken(
      payload,
      '2d',
    );

    const tokenHash = createHash('sha256').update(refreshToken).digest('hex');

    await this.refreshTokenRepository.create({
      userId,
      jti,
      tokenHash,
      expiresAt: new Date(Date.now() + expiresInMs),
      ip: deviceInfo.ip,
      deviceType: deviceInfo.deviceType,
      deviceName: deviceInfo.deviceName,
    });

    return refreshToken;
  }

  /** Valida um refresh token e retorna payload e tokenRecord */
  async validateRefreshToken(
    refreshToken: string,
  ): Promise<{ payload: JwtPayload; tokenRecord: RefreshTokenDocument }> {
    const payload = this.jwtTokenService.verifyToken(refreshToken);

    if (payload.type !== JwtTokenType.REFRESH)
      throw new UnauthorizedException('Token inválido');

    const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
    const tokenRecord = await this.refreshTokenRepository.findByJti(
      payload.jti,
    );

    if (
      !tokenRecord ||
      tokenRecord.tokenHash !== tokenHash ||
      tokenRecord.expiresAt < new Date()
    ) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    return { payload, tokenRecord };
  }

  /** Rotaciona refresh token: remove o antigo e cria um novo */
  async rotateRefreshToken(
    oldPayload: JwtPayload,
    oldTokenRecord: RefreshTokenDocument,
    deviceInfo: DeviceInfo,
  ): Promise<string> {
    await this.refreshTokenRepository.deleteByJti(oldPayload.jti);

    const newJti = randomUUID();
    const newPayload: JwtPayload = {
      sub: oldPayload.sub,
      role: oldPayload.role,
      jti: newJti,
      type: JwtTokenType.REFRESH,
    };
    const newRefreshToken = this.jwtTokenService.generateRefreshToken(
      newPayload,
      '2d',
    );

    const tokenHash = createHash('sha256')
      .update(newRefreshToken)
      .digest('hex');
    await this.refreshTokenRepository.create({
      userId: oldPayload.sub,
      jti: newJti,
      tokenHash,
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      ip: deviceInfo.ip ?? oldTokenRecord.ip,
      deviceType: deviceInfo.deviceType ?? oldTokenRecord.deviceType,
      deviceName: deviceInfo.deviceName ?? oldTokenRecord.deviceName,
    });

    return newRefreshToken;
  }

  /** Revoga um refresh token individual */
  async revokeRefreshToken(jti: string) {
    await this.refreshTokenRepository.deleteByJti(jti);
  }

  /** Revoga todos os refresh tokens de um usuário (logout global) */
  async revokeAllUserTokens(userId: string) {
    await this.refreshTokenRepository.deleteByUserId(userId);
  }
}
