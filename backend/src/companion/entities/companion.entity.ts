import { Guest } from 'src/guests/entities/guest.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Companion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @ManyToOne(() => Guest, (guest) => guest.accompaniments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'guestId' })
  guest: Guest;

  @Column()
  guestId: number;
}
