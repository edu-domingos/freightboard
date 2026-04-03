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
    return this.userRepository.save(userData);
  }

  async deleteById(id: string) {
    return this.userRepository.delete(id);
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
