import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  private readonly pepper = process.env.PEPPER || 'sdhshdhdgfhgdhdhdgfh';

  async hashPassword(password: string): Promise<string> {
    const passwordWithPepper = password + this.pepper;
    return argon2.hash(passwordWithPepper);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordWithPepper = password + this.pepper;
    return argon2.verify(hash, passwordWithPepper);
  }
}
