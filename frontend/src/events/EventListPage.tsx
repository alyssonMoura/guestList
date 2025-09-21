import { useEffect, useState } from 'react';
import { ModernCardList } from '../components/ModernCardList';
import { ModernButton } from '../components/ModernButton';
import type { CardItem } from '../components/ModernCardList';
import axios from 'axios';
import type { Event } from '../entities/Event';

function EventListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Event[]>('http://localhost:3000/events')
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setLoading(false);
      });
  }, []);

  const cardItems: CardItem[] = events.map(event => ({
    id: event.id,
    title: event.name,
    subtitle: event.date ? `Data: ${new Date(event.date).toLocaleDateString()}` : undefined,
    description: event.location ? `Local: ${event.location}` : undefined,
    additionalInfo: event.description ? `Descrição: ${event.description.substring(0, 50)}...` : undefined
  }));

  return (
    <div className="modern-container">
      <h1 className="modern-title">Gerenciador de Eventos</h1>
      
      <div className="action-bar">
        <div className="action-bar-left">
          <h2 className="modern-subtitle mb-0">Lista de Eventos</h2>
        </div>
        <div className="action-bar-right">
          <ModernButton
            text="+ Novo Evento"
            route="/events"
            variant="success"
          />
        </div>
      </div>

      <ModernCardList
        items={cardItems}
        baseRoute="/events"
        loading={loading}
        emptyMessage="Nenhum evento encontrado. Crie seu primeiro evento!"
        loadingMessage="Carregando eventos..."
        itemsPerPage={8}
      />
    </div>
  );
}

export default EventListPage;
