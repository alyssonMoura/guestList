import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { EventButton } from '../components/EventButton';

interface Event {
  id?: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

const API_URL = 'http://localhost:3000/events';

export function EventsActionPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [event, setEvent] = useState<Event>({
    name: '',
    date: '',
    location: '',
    description: '',
  });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      axios.get<Event>(`${API_URL}/${id}`)
        .then(res => {
          setEvent(res.data);
          setLoading(false);
        })
        .catch(() => {
          navigate('/');
          setLoading(false);
        });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/${id}`, event);
      } else {
        await axios.post(API_URL, event);
      }
      navigate('/');
    } catch {
      alert('Erro ao salvar evento');
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Carregando...</div>;
  }

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#007BFF', marginBottom: '20px', marginTop: '50px' }}>
        {isEdit ? 'Editar Evento' : 'Criar Evento'}
      </h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Nome:
            </label>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={event.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
         </div>
            
        <div>
          <label htmlFor="date" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Data
          </label>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
         </div>
            
        <div>
          <label htmlFor="location" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Local:
          </label>
        <input
          type="text"
          name="location"
          placeholder="Local"
          value={event.location}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        </div>
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Descrição:
          </label>
        <textarea
          name="description"
          placeholder="Descrição"
          value={event.description}
          onChange={handleChange}
          rows={3}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>

          <button
            type="submit"
            style={{
              background: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '1em',
              cursor: 'pointer',
              marginTop: '20px',
              marginBottom: '20px',
              marginRight: '10px',
            }}
            >
            {isEdit ? 'Salvar Alterações' : 'Criar Evento'}
          </button>
        <EventButton text="Cancelar" route="/" color="#888" />
          </div>
        </div>
      </form>
    </div>
  );
}