import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFreightDto {
  @IsNotEmpty()
  @IsString()
  idUser: string;

  @IsNotEmpty()
  @IsString()
  originAddress: string;

  @IsNotEmpty()
  @IsString()
  destinationAddress: string;

  @IsNotEmpty()
  @IsNumber()
  distance: number;

  @IsOptional()
  @IsNumber()
  toll?: number;

  @IsNotEmpty()
  @IsNumber()
  supply: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
