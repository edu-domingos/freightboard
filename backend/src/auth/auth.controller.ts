import { Body, Controller, Post } from '@nestjs/common';
import { AuthSerivce } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from 'src/token/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthSerivce) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
