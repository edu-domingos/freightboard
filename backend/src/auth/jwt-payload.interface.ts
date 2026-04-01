export interface JwtPayload {
  /** Subject: geralmente o ID do usuário */
  sub: string;

  /** Tipo de token: access, refresh, etc */
  type: string;

  /** Id único do token */
  jti?: string;

  /** Data de expiração do token (timestamp Unix) */
  exp?: number;

  /** Data de emissão do token (timestamp Unix) */
  iat?: number;

  /** Emissor do token (opcional, se você usa multi-issuer) */
  iss?: string;

  /** Público do token (opcional) */
  aud?: string;
}
