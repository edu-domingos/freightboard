import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshJwtDto } from './refresh-jwt.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { FastifyRequest } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Req() req: FastifyRequest, @Body() loginDto: LoginDto) {
    const userAgent: string | undefined = req.headers['user-agent'];
    return this.authService.login(userAgent, loginDto);
  }

  @Post('refresh')
  async refresh(
    @Req() req: FastifyRequest,
    @Body() refreshJwtDto: RefreshJwtDto,
  ) {
    const userAgent: string | undefined = req.headers['user-agent'];
    return this.authService.refreshToken(req.user, userAgent, refreshJwtDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() refreshJwtDto: RefreshJwtDto) {
    await this.authService.logout(refreshJwtDto);
  }
}
