import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { HashService } from '../hash/hash.service';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/entities/user.entity';
import { RefreshTokenDto } from 'src/token/dto/refresh-token.dto';
import { TokenType } from 'src/token/enums/token-type.enum';

@Injectable()
export class AuthSerivce {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly tokenSerive: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    const passwordIsValid = await this.hashService.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Email or password is invalid');
    }

    return this.createTokens(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const payload = this.tokenSerive.verifyToken(refreshTokenDto.refreshToken);

    if (!payload || payload.sub) {
      throw new UnauthorizedException('');
    }

    const user = await this.usersService.findById(payload.sub);

    return this.createTokens(user);
  }

  createTokens(user: User) {
    const accessPayload = {
      sub: user.id,
      type: TokenType.ACCESS,
    };

    const refreshPayload = {
      sub: user.id,
      type: TokenType.REFRESH,
    };

    const accessToken = this.tokenSerive.signAccessToken(accessPayload);

    const refreshToken = this.tokenSerive.signRefreshToken(refreshPayload);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
