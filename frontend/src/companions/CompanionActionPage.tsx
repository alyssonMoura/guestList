import { useState } from "react";
import type { Companion } from "../entities/Companion";

interface CompanionActionProps {
    companions: Companion[];
    onAddCompanion: (companion: Omit<Companion, "guestId" | "id">) => void;
    onRemoveCompanion: (companionId: number | undefined, index: number) => void;
    onUpdateCompanion: (index: number, updatedCompanion: Companion) => void;
}

const CompanionAction = ({ companions, onAddCompanion, onRemoveCompanion, onUpdateCompanion }: CompanionActionProps) =>  {
    const [nameAdd, setNameAdd] = useState("");
    const [phoneAdd, setPhoneAdd] = useState("");

    const handleAddClick = () => {
        if (!nameAdd) return;
        onAddCompanion({ name: nameAdd, phone: phoneAdd });
        setNameAdd("");
        setPhoneAdd("");
    };

    const handleRemoveClick = (companion: Companion, index: number) => {
        onRemoveCompanion(companion.id, index);
    }
    
    const handleCompanionChange = (index: number, field: 'name' | 'phone', value: string) => {
        const updatedCompanion = { ...companions[index], [field]: value };
        onUpdateCompanion(index, updatedCompanion);
    };

    return (
        <div className="container">
            <h3>Acompanhantes</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Nome do Acompanhante"
                    value={nameAdd}
                    onChange={e => setNameAdd(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />    
                <input
                    type="text"
                    placeholder="Telefone"
                    value={phoneAdd}
                    onChange={e => setPhoneAdd(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    type="button"
                    onClick={handleAddClick}
                    style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', background: '#28a745', color: 'white', cursor: 'pointer' }}
                >
                    Adicionar
                </button>
            </div>

            {companions.map((companion, index) => (
                <div key={companion.id || `new-${index}`} style={{ display: 'flex', gap: '10px', marginBottom: '5px', alignItems: 'center' }}>
                    <input type="text" value={companion.name} onChange={(e) => handleCompanionChange(index, 'name', e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <input type="text" value={companion.phone || ''} onChange={(e) => handleCompanionChange(index, 'phone', e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    <button type="button" onClick={() => handleRemoveClick(companion, index)} style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', background: '#dc3545', color: 'white', cursor: 'pointer' }}>X</button>
                </div>
            ))}
        </div>
    );
}

export default CompanionAction;
