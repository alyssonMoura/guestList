import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ModernButton } from '../components/ModernButton';

// Interface para a estrutura de dados de um evento
interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

// URL base da sua API de eventos
const API_URL = 'http://localhost:3000/events';

function EventPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get<Event>(`${API_URL}/${id}`);
        setEvent(response.data);
      } catch {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="modern-container">
        <div className="loading">Carregando evento...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="modern-container">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <div>Evento não encontrado.</div>
          <ModernButton
            text="← Voltar"
            route="/"
            variant="secondary"
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="modern-container">
      <div className="card card-comfortable">
        <h1 className="modern-title">{event.name}</h1>
        
        <div className="grid grid-cols-1" style={{ gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <strong>Data:</strong> {new Date(event.date).toLocaleDateString()}
          </div>
          <div>
            <strong>Local:</strong> {event.location}
          </div>
          <div>
            <strong>Descrição:</strong> {event.description}
          </div>
        </div>

        <div className="action-bar">
          <div className="action-bar-left">
            <ModernButton
              text="← Voltar"
              route="/"
              variant="secondary"
            />
          </div>
          <div className="action-bar-right">
            <ModernButton
              text="Lista de Convidados"
              route={`/events/${event.id}/guests`}
              variant="primary"
            />
            <ModernButton
              text="Enviar Convites"
              route={`/events/${event.id}/guests/invite`}
              variant="success"
            />
            <ModernButton
              text="Editar"
              route={`/events/${event.id}/edit`}
              variant="warning"
            />
            <ModernButton
              text="Excluir"
              route={`/events/${event.id}/delete`}
              variant="danger"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;