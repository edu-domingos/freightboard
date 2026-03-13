import { DeviceType } from './enums/device-type.enum';

export interface RefreshTokenDocument {
  userId: string;
  jti: string;
  tokenHash: string;
  expiresAt: Date;
  ip?: string;
  deviceType?: DeviceType | string;
  deviceName?: string;
}
