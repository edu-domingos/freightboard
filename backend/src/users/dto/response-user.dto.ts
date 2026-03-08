import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  readonly _id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;

  @Exclude()
  readonly password: string;
}
