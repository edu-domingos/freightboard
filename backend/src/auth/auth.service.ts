import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from 'src/users/users.repository';
import { PasswordService } from 'src/common/password.service';
import { JwtTokenService } from '../common/jwt/jwt-token.service';
import { RefreshTokenService } from './refresh-token.service';
import { DeviceInfo } from './interfaces/device-info.interface';
import { randomUUID } from 'crypto';
import { JwtTokenType } from 'src/common/jwt/jwt-token.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  /** LOGIN */
  async authenticate(loginDto: LoginDto, deviceInfo: DeviceInfo = {}) {
    // Encontre o usuário no banco de dados pelo email
    const user = await this.usersRepository.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Usuário ou senha inválidos'); // Evite dizer se é email ou senha inválidos

    // Valide a senha
    const passwdValid = await this.passwordService.verifyPassword(
      loginDto.password,
      user.password,
    );
    if (!passwdValid)
      throw new UnauthorizedException('Usuário ou senha inválidos');

    // Gerar Access Token
    const accessPayload = {
      sub: user._id.toString(),
      role: user.role ?? 'user',
      jti: randomUUID(),
      type: JwtTokenType.ACCESS,
    };
    const accessToken = this.jwtTokenService.generateToken(accessPayload);

    // Criar Refresh Token
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      user._id.toString(),
      deviceInfo,
    );

    return {
      accessToken,
      refreshToken,
      user: { id: user._id.toString(), role: user.role ?? 'user' },
    };
  }

  /** ROTATION DO REFRESH TOKEN */
  async refreshAuthenticate(
    oldRefreshToken: string,
    deviceInfo: DeviceInfo = {},
  ) {
    const { payload, tokenRecord } =
      await this.refreshTokenService.validateRefreshToken(oldRefreshToken);

    // Novo access token
    const newAccessToken = this.jwtTokenService.generateToken({
      sub: payload.sub,
      role: payload.role,
      jti: randomUUID(),
      type: JwtTokenType.ACCESS,
    });

    // Rotaciona refresh token
    const newRefreshToken = await this.refreshTokenService.rotateRefreshToken(
      payload,
      tokenRecord,
      deviceInfo,
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  /** LOGOUT INDIVIDUAL */
  async logout(refreshToken: string) {
    const { payload } =
      await this.refreshTokenService.validateRefreshToken(refreshToken);

    if (!payload)
      throw new UnauthorizedException('Refresh token inválido ou expirado');

    // Revogar o refresh token
    await this.refreshTokenService.revokeRefreshToken(payload.jti);

    return { message: 'Logout realizado com sucesso' };
  }

  /** LOGOUT GLOBAL */
  async logoutAll(userId: string) {
    // Revogar todos os refresh tokens do usuário
    await this.refreshTokenService.revokeAllUserTokens(userId);

    return { message: 'Todos os dispositivos foram desconectados' };
  }

  /** LOGOUT DE UM DISPOSITIVO ESPECÍFICO */
  async logoutDevice(jti: string) {
    // Revogar refresh token do dispositivo
    await this.refreshTokenService.revokeRefreshToken(jti);

    return { message: 'Dispositivo desconectado' };
  }
}
