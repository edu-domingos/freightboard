import { JwtTokenType } from './jwt-token.types';

export interface JwtPayload {
  sub: string; // ID do usuário (UUID)
  role: 'user' | 'admin'; // Role do usuário
  jti: string; // Identificador único do token
  type: JwtTokenType;
  iat?: number; // Issued At (em UNIX timestamp)
  exp?: number; // Expiração
  nbf?: number; // Not Before (opcional)
  iss?: string; // Issuer
  aud?: string; // Audience
}
