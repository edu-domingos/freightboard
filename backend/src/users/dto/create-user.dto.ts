import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome precisa ser um texto' })
  @MinLength(3, { message: 'O nome precisa ter ao menos 3 caracteres' })
  readonly name: string;

  @IsEmail({}, { message: 'Email inválido' })
  readonly email: string;

  @IsString({ message: 'O password precisa ser um texto' })
  @MinLength(6, { message: 'O nome precisa ter ao menos 6 caracteres' })
  readonly password: string;
}
