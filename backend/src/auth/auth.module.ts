import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Argon2Service } from './argon2.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { RefreshToken } from './refresh-tokens.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        algorithm: configService.get<'HS256'>('JWT_ALGORITHM'),
        audience: configService.get<string>('JWT_AUDIENCE'),
        issuer: configService.get<string>('JWT_ISSUER'),
        expiresIn: Number(configService.get<string>('JWT_EXPIRES_IN')),
      },
    }),
  }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, Argon2Service],
  exports: [],
})
export class AuthModule {}
