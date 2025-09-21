import { Guest } from 'src/guests/entities/guest.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Guest, (guest) => guest.event)
  guests: Guest[];
}
