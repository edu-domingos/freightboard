import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Freight } from './entities/freight.entity';
import { FreightController } from './freight.controller';
import { FreightService } from './freight.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Freight]), UsersService],
  controllers: [FreightController],
  providers: [FreightService],
  exports: [],
})
export class FreightModule {}
