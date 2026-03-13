import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DeviceType } from '../enums/device-type.enum';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'refresh_tokens', timestamps: true })
export class RefreshToken {
  @Prop({ type: String, default: () => uuidv4() })
  _id: string;

  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, required: true, unique: true })
  jti: string;

  @Prop({ type: String, required: true })
  tokenHash: string;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  @Prop({
    type: String,
    enum: DeviceType,
    default: 'other',
  })
  deviceType: string;

  @Prop({ type: String })
  deviceName?: string;

  @Prop({ type: String })
  ip?: string; // IP do dispositivo
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
export type RefreshTokenDocument = HydratedDocument<RefreshToken>;
