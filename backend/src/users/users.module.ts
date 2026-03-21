import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { HashModule } from 'src/hash/hash.module';
import { UsersRepository } from './users.repository';
import { Freight } from 'src/freights/entitites/freight.entity';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Freight]), HashModule, TokenModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
