import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './login.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtType } from './jwt-type.enum';
import { RefreshJwtDto } from './refresh-jwt.dto';
import { Argon2Service } from './argon2.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from './refresh-tokens.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: Argon2Service,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async login(userAgent: string, loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    const passwordIsValid = await this.hashService.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Email or password is invalid');
    }

    return this.createTokens(userAgent, user);
  }

  async refreshToken(user: User, userAgent: string, refreshTokenDto: RefreshJwtDto) {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify<JwtPayload>(refreshTokenDto.refreshToken);
    } catch {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    if (payload.type !== JwtType.REFRESH) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenExists = await this.refreshTokenRepository.findOne({
      where: { jti: payload.jti },
    });

    if (!tokenExists) {
      throw new UnauthorizedException('Token inválido ou já utilizado');
    }

    await this.refreshTokenRepository.delete({ jti: payload.jti });

    return this.createTokens(userAgent, user);
  }

  async logout(id: string, refreshTokenDto: RefreshJwtDto) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshTokenDto.refreshToken);

      if (payload.type !== JwtType.REFRESH) {
        throw new UnauthorizedException('Token inválido');
      }

      const tokenExists = await this.refreshTokenRepository.findOne({
        where: { jti: payload.jti },
      });

      if (!tokenExists) {
        throw new UnauthorizedException('Token inválido ou revogado');
      }

      await this.refreshTokenRepository.delete({
        jti: payload.jti,
      });

      return { message: 'Logout realizado com sucesso' };

    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  async createTokens(userAgent: string = 'unknown', user: User) {
    const accessJti = uuidv4();
    const accessPayload = {
      sub: user.id,
      type: JwtType.ACCESS,
      jti: accessJti,
    };

    const refreshJti = uuidv4();
    const refreshPayload = {
      sub: user.id,
      type: JwtType.REFRESH,
      jti: refreshJti,
    };

    const jwtExpires = Number(this.configService.get<number>('JWT_EXPIRES_IN'));
    const accessToken = this.jwtService.sign(accessPayload, {
      expiresIn: jwtExpires,
    });

    const jwtRefreshExpires = Number(this.configService.get<number>('JWT_REFRESH_EXPIRES_IN'));
    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: jwtRefreshExpires,
    });

    const decoded = this.jwtService.decode(refreshToken) as any;

    await this.refreshTokenRepository.save({
      jti: refreshJti,
      user: { id: user.id },
      expiresAt: new Date(decoded.exp * 1000),
      userAgent: userAgent,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
