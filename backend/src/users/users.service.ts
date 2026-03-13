import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { PasswordService } from 'src/common/password.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (userExist) {
      throw new ConflictException('e-mail já em uso');
    }

    const hashPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const createdUser = await this.usersRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    return plainToInstance(ResponseUserDto, createdUser.toObject());
  }
}
