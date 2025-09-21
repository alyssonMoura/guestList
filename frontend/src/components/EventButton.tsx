import { useNavigate } from 'react-router-dom';

interface EventButtonProps {
  text: string;
  route: string;
  color?: string;
}

export function EventButton({ text, route, color = '#007BFF' }: EventButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      style={{
        background: color,
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
      onClick={() => navigate(route)}
    >
      {text}
    </button>
  );
}