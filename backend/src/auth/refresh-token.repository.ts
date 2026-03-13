import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from './schemas/refresh-token.schema';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async create(refreshToken: Partial<RefreshToken>): Promise<RefreshToken> {
    return this.refreshTokenModel.create(refreshToken);
  }

  async findByJti(jti: string): Promise<RefreshToken | null> {
    return this.refreshTokenModel.findOne({ jti }).exec();
  }

  async findByUserId(userId: string): Promise<RefreshToken[]> {
    return this.refreshTokenModel.find({ userId }).exec();
  }

  async deleteByJti(jti: string): Promise<void> {
    await this.refreshTokenModel.deleteOne({ jti }).exec();
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.refreshTokenModel.deleteMany({ userId }).exec();
  }
}
