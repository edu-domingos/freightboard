import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { CurrentUser } from 'src/auth/decorators/params/current-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** cadastrar usuário */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /** atualizar usuário */
  @UseGuards(AuthTokenGuard)
  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }

  /** trazer dados do usuário */
  @UseGuards(AuthTokenGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async findById(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }
}
