import { Module } from '@nestjs/common';
import { Argon2Service } from './argon2.service';
import { HashService } from './hash.service';

@Module({
  providers: [
    {
      provide: HashService,
      useClass: Argon2Service,
    },
  ],
  exports: [HashService],
})
export class HashModule {}
