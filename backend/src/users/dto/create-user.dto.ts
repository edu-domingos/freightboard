import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsEnum,
  Length,
} from 'class-validator';
import { IsCPF } from '../../common/decorators/is-cpf-decorators';
import { UserType } from '../enums/user-type.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsNotEmpty()
  @Length(11, 14)
  @IsCPF()
  cpf!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  type!: UserType;
}
