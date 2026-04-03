import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { DeepPartial } from 'typeorm';
import { Argon2Service } from 'src/auth/argon2.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import path from 'path';
import fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly hashService: Argon2Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('E-mail already in use');
    }

    const passwordHash = await this.hashService.hash(createUserDto.password);

    const cpf = createUserDto.cpf.replace(/\D/g, '');

    const userData: DeepPartial<User> = {
      ...createUserDto,
      cpf: cpf,
      password: passwordHash,
      role: UserRole.USER,
    };

    return this.userRepository.createAndSave(userData);
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    const userData: DeepPartial<User> = {
      id: user.id,
      name: updateUserDto.name,
    };

    if (updateUserDto?.password) {
      const passwordHash = await this.hashService.hash(updateUserDto.password);

      userData.password = passwordHash;
    }

    await this.userRepository.updateAndSave(userData);

    return this.cacheManager.del(`user:${user.id}`);
  }

  async deleteById(user: User) {
    await this.userRepository.deleteById(user.id);
    return this.cacheManager.del(`user:${user.id}`);
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

  async updateAvatar(user: User, file: any) {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error('Tipo de arquivo não permitido. Apenas PNG ou JPEG.');
    }

    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const filename = `${user.id}-${Date.now()}-${file.filename}`;
    const filePath = path.join(uploadDir, filename);

    const data = await file.toBuffer();
    fs.writeFileSync(filePath, data);

    const userData: DeepPartial<User> = {
      ...user,
      avatar: `/uploads/${filename}`,
    };

    return this.userRepository.updateAndSave(userData);
  }
}
