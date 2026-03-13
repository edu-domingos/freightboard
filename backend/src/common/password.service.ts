import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
  private readonly pepper: string;

  constructor(private readonly configService: ConfigService) {
    this.pepper = this.configService.getOrThrow<string>('PEPPER');
  }

  private applyPepper(password: string): string {
    return crypto
      .createHmac('sha256', this.pepper)
      .update(password)
      .digest('hex');
  }

  async hashPassword(password: string): Promise<string> {
    const passwordWithPepper = this.applyPepper(password);

    return argon2.hash(passwordWithPepper, {
      type: argon2.argon2id,
      timeCost: 4,
      memoryCost: 2 ** 16,
      parallelism: 2,
    });
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordWithPepper = this.applyPepper(password);
    return argon2.verify(hash, passwordWithPepper);
  }
}
