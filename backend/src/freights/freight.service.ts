import { Injectable } from '@nestjs/common';
import { CreateFreightDto } from './dto/create-freight.dto';
import { FreightRepository } from './freight.repository';
import { DeepPartial } from 'typeorm';
import { Freight } from './entitites/freight.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FreightService {
  constructor(
    private readonly freightRepository: FreightRepository,
    private readonly userService: UsersService,
  ) {}

  async create(id: string, createFreightDto: CreateFreightDto) {
    const freightData: DeepPartial<Freight> = {
      id,
      ...createFreightDto,
    };

    return this.freightRepository.createAndSave(freightData);
  }
}
