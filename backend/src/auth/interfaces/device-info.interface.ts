import { DeviceType } from '../enums/device-type.enum';

export interface DeviceInfo {
  ip?: string;
  deviceType?: DeviceType;
  deviceName?: string;
}
