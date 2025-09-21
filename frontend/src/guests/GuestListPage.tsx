import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Guest } from '../entities/Guest';
import type { Event } from '../entities/Event';
import { ModernButton } from '../components/ModernButton';
import { ModernCardList, type CardItem } from '../components/ModernCardList';

const API_URL = 'http://localhost:3000/events';

export function GuestListPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get<Guest[]>(`${API_URL}/${eventId}/guests`).catch(() => ({ data: [] })),
      axios.get<Event>(`${API_URL}/${eventId}`).catch(() => ({ data: null }))
    ]).then(([guestsRes, eventRes]) => {
      setGuests(guestsRes.data);
      setEvent(eventRes.data);
      setLoading(false);
    });
  }, [eventId]);

  const cardItems: CardItem[] = guests.map(guest => ({
    id: guest.id,
    title: guest.name,
    subtitle: guest.status ? `Status: ${guest.status}` : undefined,
    description: guest.phone ? `Telefone: ${guest.phone}` : 'Telefone não informado',
    additionalInfo: guest.family ? `Família: ${guest.family}` : undefined
  }));

  return (
    <div className="modern-container">
      <h1 className="modern-title">Lista de Convidados</h1>
      {event && (
        <h2 className="modern-subtitle text-center mb-4">{event.name}</h2>
      )}
      
      <div className="action-bar">
        <div className="action-bar-left">
          <ModernButton
            text="← Voltar"
            route={`/events/${eventId}`}
            variant="secondary"
          />
        </div>
        <div className="action-bar-right">
          <ModernButton
            text="+ Novo Convidado"
            route={`/events/${eventId}/guests/new`}
            variant="success"
          />
        </div>
      </div>

      <ModernCardList
        items={cardItems}
        baseRoute={`/events/${eventId}/guests`}
        loading={loading}
        emptyMessage="Nenhum convidado encontrado. Adicione o primeiro convidado!"
        loadingMessage="Carregando convidados..."
        itemsPerPage={10}
      />
    </div>
  );
}

export default GuestListPage;