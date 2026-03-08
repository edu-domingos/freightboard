import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schame';
import { PasswordService } from 'src/common/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PasswordService],
})
export class UsersModule {}
