import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { Freight } from 'src/freights/entities/freight.entity';
import { Argon2Service } from 'src/auth/argon2.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Freight])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, Argon2Service],
  exports: [UsersService],
})
export class UsersModule {}
