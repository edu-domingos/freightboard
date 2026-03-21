import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsEmail()
  email?: string;

  @MinLength(6)
  password?: string;
}
