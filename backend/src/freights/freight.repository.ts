import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Freight } from './entitites/freight.entity';

@Injectable()
export class FreightRepository {
  constructor(
    @InjectRepository(Freight)
    private readonly freightRepository: Repository<Freight>,
  ) {}

  async createAndSave(freightData: DeepPartial<Freight>) {
    const newFreight = this.freightRepository.create(freightData);
    return this.freightRepository.save(newFreight);
  }

  async findAll(limit: number, offset: number) {
    return this.freightRepository.find({
      take: limit,
      skip: offset,
      relations: ['user'],
      order: {
        id: 'desc',
      },
    });
  }
}
