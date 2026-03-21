import { Global, Module } from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import { BcryptService } from '../hash/bcrypt.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: HashService,
      useClass: BcryptService,
    },
  ],
  exports: [],
})
export class AuthModule {}
