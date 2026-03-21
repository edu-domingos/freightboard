import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('freights')
export class Freight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.freights, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column({ name: 'origin_address', type: 'varchar', length: 255 })
  originAddress: string;

  @Column({ name: 'destination_address', type: 'varchar', length: 255 })
  destinationAddress: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  distance: number;

  @Column({ nullable: true })
  toll?: number;

  @Column('decimal', { precision: 10, scale: 2 })
  supply: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
