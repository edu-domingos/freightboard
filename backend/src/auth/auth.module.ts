import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenService } from 'src/common/jwt/jwt-token.service';
import { PasswordService } from 'src/common/password.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { CommonJwtModule } from 'src/common/jwt/jwt.module';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    CommonJwtModule,
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]), // Registra o modelo RefreshToken
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    JwtTokenService,
    RefreshTokenService,
    RefreshTokenRepository,
  ],
})
export class AuthModule {}
