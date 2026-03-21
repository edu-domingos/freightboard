import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { DeepPartial } from 'typeorm';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('E-mail already in use');
    }

    const passwordHash = await this.hashService.hash(createUserDto.password);

    const userData: DeepPartial<User> = {
      ...createUserDto,
      password: passwordHash,
      role: UserRole.USER,
    };

    return this.userRepository.createAndSave(userData);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userData: DeepPartial<User> = {
      id: id,
      name: updateUserDto.name,
    };

    if (updateUserDto?.password) {
      const passwordHash = await this.hashService.hash(updateUserDto.password);

      userData.password = passwordHash;
    }

    const user = await this.userRepository.updateAndSave(userData);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
