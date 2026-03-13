import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { StringValue } from 'ms';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): JwtPayload {
    return this.jwtService.verify<JwtPayload>(token);
  }

  generateRefreshToken(
    payload: JwtPayload,
    expiresIn: StringValue | number = '7200',
  ): string {
    return this.jwtService.sign(payload, { expiresIn: expiresIn });
  }
}
