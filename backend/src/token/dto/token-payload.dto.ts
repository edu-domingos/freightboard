export class TokenPayloadDto {
  sub: string;
  type: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
