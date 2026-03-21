import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAndSave(userData: DeepPartial<User>) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async updateAndSave(userData: DeepPartial<User>) {
    const updateUser = await this.userRepository.preload(userData);

    if (!updateUser) {
      return null;
    }

    return this.userRepository.save(updateUser);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email, active: true },
    });
  }

  async findById(id: string) {
    return this.userRepository.findOne({
      where: { id: id, active: true },
    });
  }
}
