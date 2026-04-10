import {
  BadRequestException,
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
import type { FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  get(@Req() request: FastifyRequest) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: FastifyRequest,
  ) {
    return this.usersService.update(request.user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/avatar')
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(@Req() request: FastifyRequest) {
    const fileArray: MultipartFile[] = [];

    for await (const file of request.files()) {
      fileArray.push(file);
    }

    if (!fileArray || fileArray.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const file: MultipartFile = fileArray[0];

    try {
      const updatedUser = await this.usersService.updateAvatar(
        request.user,
        file,
      );

      return { avatar: updatedUser.avatar };
    } catch {
      throw new BadRequestException('Erro ao atualizar o avatar');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @HttpCode(HttpStatus.OK)
  async deleteById(@Req() request: FastifyRequest) {
    return this.usersService.deleteById(request.user);
  }
}
