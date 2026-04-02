import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async findById(@Req() request) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateUserDto: UpdateUserDto, @Req() request) {
    return this.usersService.update(request.user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/avatar')
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(@Req() req) {
    if (!req.files || req.files.length === 0)
      throw new Error('Nenhum arquivo enviado');

    const file = req.files[0]; // pegamos o primeiro arquivo enviado

    const updatedUser = await this.usersService.updateAvatar(req.user, file);

    return { avatar: updatedUser.avatar };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Req() request) {
    return this.usersService.deleteById(request.user);
  }
}
