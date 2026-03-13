import { FastifyRequest } from 'fastify';
import { DeviceType } from '../enums/device-type.enum';

/**
 * Extensão do FastifyRequest para suportar device info
 */
export interface CustomFastifyRequest extends FastifyRequest {
  deviceType?: DeviceType;
  deviceName?: string;
}
