import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EventButton } from "../components/EventButton";
import type { Guest } from "../entities/Guest";
import type { Companion } from "../entities/Companion";
import CompanionAction from "../companions/CompanionActionPage";
const API_URL = "http://localhost:3000/events";

const GuestPage = () => {
  const { guestId } = useParams<{ guestId: string }>();
  const { eventId } = useParams<{ eventId: string }>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [family, setFamily] = useState("");
  const [probability, setProbability] = useState<
    "Certa" | "Alta" | "Media" | "Baixa" | "Remota"
  >("Media");
  const [status, setStatus] = useState<
    "Pendente" | "Ausente" | "Confirmado"
  >("Pendente");
  const [adding, setAdding] = useState(false);
  const [companion, setCompanion] = useState<number | null>(null);
  const [accompaniments, setAccompaniments] = useState<Companion[]>([]);

  useEffect(() => {
    axios.get<Guest>(`${API_URL}/${eventId}/guests/${guestId}`)
      .then(res => {
              setName(res.data.name);
              setEmail(res.data.email ? res.data.email : "");
              setPhone(res.data.phone ? res.data.phone : "");
              setFamily(res.data.family ? res.data.family : "");
              setStatus(res.data.status ? res.data.status : "Pendente");
              setProbability(res.data.probability ? res.data.probability : "Media");
              setCompanion(res.data.companionId ? res.data.companionId : null);
              setAccompaniments(res.data.accompaniments ? res.data.accompaniments : []);
      })
      .catch(() => {
              setName("");
              setEmail("");
              setPhone("");
              setFamily("");
              setStatus("Pendente");
              setProbability("Media");
              setCompanion(null);
              setAccompaniments([]);              
      })
      .then(() => setAdding(false));

  }, [eventId,guestId]);

    const handleAddCompanion = (companion: Omit<Companion, "guestId" | "id">) => {
        setAccompaniments([
        ...accompaniments,
        { ...companion, guestId: Number(guestId) },
        ]);
    };

    const handleRemoveCompanion = (companionIdToRemove: number | undefined, indexToRemove: number) => {
        setAccompaniments(
        accompaniments.filter((comp, index) => {
            if (companionIdToRemove !== undefined) {
            return comp.id !== companionIdToRemove;
            }
            return index !== indexToRemove;
        }),
        );
    };

    const handleUpdateCompanion = (index: number, updatedCompanion: Companion) => {
        const newAccompaniments = [...accompaniments];
        newAccompaniments[index] = updatedCompanion;
        setAccompaniments(newAccompaniments);
    };

    const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setAdding(true);
    try {
      if (!guestId) {
        await axios.post(`${API_URL}/${eventId}/guests`, { name, email, phone, family, status, probability, companion, accompaniments });
      } else {
        await axios.put(`${API_URL}/${eventId}/guests/${guestId}`, { name, email, phone, family, status, probability, companion, accompaniments });
      }
      setName('');
      setEmail('');
      setPhone('');
      setFamily('');
      setStatus("Pendente");
      setProbability("Media");
      setCompanion(null);
      setAccompaniments([]);
      alert('Convidado salvo com sucesso!');
      window.location.href = `/events/${eventId}/guests`;
    } catch {
      console.error('Erro ao adicionar convidado');
      alert('Erro ao adicionar convidado');
    } finally {
      setAdding(false);
    }
  };

  function handleDeleteGuest(guestId: string): void {
    if (window.confirm("Tem certeza que deseja excluir este convidado?")) {
      axios.delete(`${API_URL}/${eventId}/guests/${guestId}`)
        .then(() => {
          alert("Convidado excluído com sucesso.");
          window.location.href = `/events/${eventId}/guests`;
        })
        .catch(() => {
          alert("Erro ao excluir convidado.");
        });
    }
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="page-header">
          <h3 className="title">Convidado</h3>
        </div>
        <form onSubmit={handleAddGuest} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Nome:
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                E-mail:
              </label>
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            
            <div>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Telefone:
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Telefone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            
            <div>
              <label htmlFor="family" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Referência:
              </label>
              <input
                id="family"
                type="text"
                placeholder="Referência"
                value={family}
                onChange={e => setFamily(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label htmlFor="status" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Status:
              </label>
              <select
                id="status"
                value={status}
                onChange={e => setStatus(e.target.value as 'Pendente'| 'Confirmado' | 'Ausente' )}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="Pendente">Pendente</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Ausente">Ausente</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="probability" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Probabilidade:
              </label>
              <select
                id="probability"
                value={probability}
                onChange={e => setProbability(e.target.value as 'Certa' | 'Alta' | 'Media' | 'Baixa' | 'Remota')}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="Certa">Certa</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baixa">Baixa</option>
                <option value="Remota">Remota</option>
              </select>
            </div>
            <CompanionAction
              companions={accompaniments}
              onAddCompanion={handleAddCompanion}
              onRemoveCompanion={handleRemoveCompanion}
              onUpdateCompanion={handleUpdateCompanion}
            />
               
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <EventButton
                text="Voltar"
                route={`/events/${eventId}/guests`}
                color="#007BFF"
              />
                <button 
                type="submit" 
                disabled={adding}
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
                {adding ? 'Gravando...' : 'Gravar'}
              </button>
              { guestId && (
                <button type="button" onClick={() => handleDeleteGuest(guestId)} 
                  style={{ 
                  background: '#d80707ff', 
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
                  Excluir
                </button>
              )}
              {!guestId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setName('');
                    setEmail('');
                  setPhone('');
                  setFamily('');
                  setStatus("Pendente");
                  setProbability("Media");
                }}
                style={{ 
                  background: '#6c757d', 
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
                Limpar
              </button>
              )}
            </div>
          </div>

        </form>
        <p className="no-events-message">
          Página de convidados para o evento ID: {eventId}
        </p>
      </div>
    </div>
  );
};

export default GuestPage;
