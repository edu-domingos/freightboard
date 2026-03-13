import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutDeviceDto {
  @IsNotEmpty()
  @IsString()
  jti: string;
}
