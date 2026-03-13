import { JwtPayload } from 'src/common/jwt/jwt-payload.interface';
import { RefreshToken } from './schemas/refresh-token.schema';

export interface RefreshTokenValidationResult {
  payload: JwtPayload;
  tokenRecord: RefreshToken;
}
