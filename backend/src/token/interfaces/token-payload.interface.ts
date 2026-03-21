export interface TokenPayload {
  /** Subject: geralmente o ID do usuário */
  sub: string;

  /** Tipo de token: access, refresh, etc */
  type: string;

  /** Nome do usuário (opcional, mas útil para logs ou responses) */
  username?: string;

  /** Email do usuário */
  email?: string;

  /** Perfis ou roles do usuário */
  roles?: string[];

  /** Data de expiração do token (timestamp Unix) */
  exp?: number;

  /** Data de emissão do token (timestamp Unix) */
  iat?: number;

  /** Emissor do token (opcional, se você usa multi-issuer) */
  iss?: string;

  /** Público do token (opcional) */
  aud?: string;
}
