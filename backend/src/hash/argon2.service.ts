import { HashService } from './hash.service';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';

export class Argon2Service extends HashService {
  constructor(private readonly config: ConfigService) {
    super();
  }

  private getPepper(): string {
    const pepper = this.config.get<string>('HASH_PEPPER');
    if (!pepper) throw new Error('HASH_PEPPER not defined');
    return pepper;
  }

  async hash(password: string): Promise<string> {
    const pepper = this.getPepper();

    return argon2.hash(password + pepper, {
      type: argon2.argon2id, // melhor opção atualmente
      memoryCost: 2 ** 16, // 64 MB
      timeCost: 3, // iterações
      parallelism: 1,
    });
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    const pepper = this.getPepper();

    return argon2.verify(passwordHash, password + pepper);
  }
}
