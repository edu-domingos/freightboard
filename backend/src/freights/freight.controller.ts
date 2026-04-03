import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateFreightDto } from './dto/create-freight.dto';
import { FreightService } from './freight.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('freight')
export class FreightController {
  constructor(private readonly freightService: FreightService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createFreightDto: CreateFreightDto, @Req() req) {
    return this.freightService.create(req.user.id, createFreightDto);
  }
}
