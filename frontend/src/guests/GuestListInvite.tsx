import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Guest } from '../entities/Guest';
import { ModernButton } from '../components/ModernButton';

const API_URL = 'http://localhost:3000/events';

const GuestListInvite = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const { eventId } = useParams<{ eventId: string }>();
  
  useEffect(() => {
    axios.get<Guest[]>(`${API_URL}/${eventId}/guests`)
      .then(res => {
        setGuests(res.data);
      })
      .catch(() => setGuests([]))
  }, [eventId]);

  const handleSendInvite = (name: string, id: number, phone: string) => {
    const rsvpLink = `http://localhost:5173/rsvp/${id}`;
    // Gerar o link no WhatsApp
    const inviteMessage = `Olá, ${name}! Você está cordialmente convidado(a) para o nosso evento. Confirme sua presença e veja os detalhes no link a seguir: ${rsvpLink}`;
    const encodedMessage = encodeURIComponent(inviteMessage);
    
    // Se não há telefone, mostrar alerta e não abrir WhatsApp
    if (!phone || phone.trim() === '') {
      alert(`Não é possível enviar convite para ${name}: telefone não cadastrado.`);
      return;
    }
    
    const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="modern-container">
      <h1 className="modern-title">Enviar Convites</h1>
      
      <div className="action-bar">
        <div className="action-bar-left">
          <ModernButton
            text="← Voltar"
            route={`/events/${eventId}`}
            variant="secondary"
          />
        </div>
      </div>

      <div className="card-list">
        {guests.map(guest => (
          <div key={guest.id} className="card card-compact">
            <div className="card-header">
              <div>
                <h4 className="card-title">{guest.name}</h4>
                <div className="card-subtitle">
                  {guest.phone || 'Telefone não cadastrado'}
                </div>
              </div>
              <ModernButton
                text="Enviar Convite"
                onClick={() => handleSendInvite(guest.name, guest.id, guest.phone || '')}
                variant={guest.phone ? "success" : "secondary"}
                disabled={!guest.phone}
              />
            </div>
          </div>
        ))}
      </div>

      {guests.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📧</div>
          <div>Nenhum convidado encontrado para enviar convites.</div>
        </div>
      )}
    </div>
  );
};

export default GuestListInvite;
