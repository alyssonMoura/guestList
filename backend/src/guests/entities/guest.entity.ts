import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Companion } from 'src/companion/entities/companion.entity';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  family: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 'Pendente' })
  status: 'Pendente' | 'Confirmado' | 'Ausente';

  @Column({ default: 'Media' })
  probability: 'Certa' | 'Alta' | 'Media' | 'Baixa' | 'Remota';

  @ManyToOne(() => Event, (event) => event.guests)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column()
  eventId: number;

  @OneToMany(() => Companion, (companion) => companion.guest, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  accompaniments: Companion[];
}
