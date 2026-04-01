import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshJwtDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
