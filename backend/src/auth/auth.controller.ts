import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { DeviceInfo } from './interfaces/device-info.interface';
import type { CustomFastifyRequest } from './interfaces/custom-fastify-request.interface';
import { LogoutDeviceDto } from './dto/logout.dto';
import type { FastifyReply } from 'fastify';
import { randomUUID } from 'crypto';
import { CsrfGuard } from './guards/csrf.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** LOGIN - sem CSRF guard */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: CustomFastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<AuthResponseDto> {
    const deviceInfo: DeviceInfo = {
      ip: req.ip,
      deviceType: req.deviceType,
      deviceName: req.deviceName,
    };

    const tokens = await this.authService.authenticate(loginDto, deviceInfo);

    // Cookie HTTPOnly para refresh token
    res.setCookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth', // path root para todos endpoints de auth
      maxAge: 2 * 24 * 60 * 60, // 2 dias em segundos
    });

    // Cookie acessível para CSRF token
    const csrfToken = randomUUID();
    res.setCookie('csrf_token', csrfToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      path: '/auth',
      maxAge: 2 * 24 * 60 * 60,
    });

    return { accessToken: tokens.accessToken, csrfToken };
  }

  /** REFRESH - com CSRF guard */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CsrfGuard)
  async refresh(
    @Req() req: CustomFastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken)
      throw new UnauthorizedException('Refresh token não encontrado');

    const tokens = await this.authService.refreshAuthenticate(refreshToken);

    // Atualiza cookie de refresh token
    res.setCookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth',
      maxAge: 2 * 24 * 60 * 60,
    });

    // Gera novo CSRF token
    const csrfToken = randomUUID();
    res.setCookie('csrf_token', csrfToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      path: '/auth',
      maxAge: 2 * 24 * 60 * 60,
    });

    return { accessToken: tokens.accessToken, csrfToken };
  }

  /** LOGOUT individual */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CsrfGuard)
  async logout(
    @Req() req: CustomFastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token não encontrado');

    await this.authService.logout(refreshToken);

    // Limpa cookies
    res.clearCookie('refresh_token', { path: '/auth' });
    res.clearCookie('csrf_token', { path: '/auth' });

    return { message: 'Logout realizado com sucesso' };
  }

  /** LOGOUT de um dispositivo específico */
  @Post('logout/device')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CsrfGuard)
  async logoutDevice(@Body() dto: LogoutDeviceDto) {
    return this.authService.logoutDevice(dto.jti);
  }

  /** LOGOUT global de todos dispositivos do usuário */
  @Post('logout/all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CsrfGuard)
  async logoutAll(
    @Req() req: CustomFastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token não encontrado');

    await this.authService.logoutAll(refreshToken);

    // Limpa cookies
    res.clearCookie('refresh_token', { path: '/auth' });
    res.clearCookie('csrf_token', { path: '/auth' });

    return { message: 'Logout de todos dispositivos realizado com sucesso' };
  }
}
