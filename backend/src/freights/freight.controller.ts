import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateFreightDto } from './dto/create-freight.dto';
import { FreightService } from './freight.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@UseGuards(AuthTokenGuard)
@Controller('freight')
export class FreightController {
  constructor(private readonly freightService: FreightService) {}

  @Post()
  async create(
    @Body() createFreightDto: CreateFreightDto,
    @Param('id') id: string,
  ) {
    return this.freightService.create(id, createFreightDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.freightService.findAll(paginationDto);
  }
}
