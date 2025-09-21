import type { Event } from "./Event";
import type { Companion } from "./Companion";
export interface Guest {
  id: number;
  name: string;
  email?: string;
  eventId: number;
  event: Event
  probability?: 'Certa' | 'Alta' | 'Media' | 'Baixa' | 'Remota';
  phone?: string;
  family?: string;
  status?: 'Pendente' | 'Confirmado' | 'Ausente';
  companionId?: number | null;
  companion?: Guest | null;
  accompaniments?: Companion[];
}
