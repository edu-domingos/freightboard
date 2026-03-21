import { Injectable } from '@nestjs/common';
import { CreateFreightDto } from './dto/create-freight.dto';
import { FreightRepository } from './freight.repository';
import { DeepPartial } from 'typeorm';
import { Freight } from './entitites/freight.entity';
import { UsersService } from 'src/users/users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class FreightService {
  constructor(
    private readonly freightRepository: FreightRepository,
    private readonly userService: UsersService,
  ) {}

  async create(id: string, createFreightDto: CreateFreightDto) {
    await this.userService.findById(id);

    const freightData: DeepPartial<Freight> = {
      id,
      ...createFreightDto,
    };

    return this.freightRepository.createAndSave(freightData);
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto || {};
    return this.freightRepository.findAll(limit, offset);
  }
}
