import React from 'react';
import { Link } from 'react-router-dom';

export interface CardItem {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  additionalInfo?: string;
}

interface CardListLinkProps {
  items: CardItem[];
  baseRoute: string;
  loading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  title?: string;
}

export const CardListLink: React.FC<CardListLinkProps> = ({
  items,
  baseRoute,
  loading = false,
  emptyMessage = "Nenhum item encontrado.",
  loadingMessage = "Carregando...",
  title
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        {loadingMessage}
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {title}
        </h2>
      )}
      
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'gray' }}>
          {emptyMessage}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {items.map(item => (
            <Link
              key={item.id}
              to={`${baseRoute}/${item.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  background: '#f9f9f9',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.boxShadow = '0 2px 8px #ccc')}
                onMouseOut={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                <h3 style={{ margin: '0 0 5px', color: '#007BFF' }}>
                  {item.title}
                </h3>
                {item.subtitle && (
                  <span style={{ margin: '5px 0 0', color: '#000' }}>
                    {item.subtitle}
                  </span>
                )}
                {item.description && (
                  <span style={{ margin: '5px 0 0', color: '#888' }}>
                    | {item.description}
                  </span>
                )}
                {item.additionalInfo && (
                  <span style={{ margin: '5px 0 0', color: '#666', fontSize: '0.9em' }}>
                    | {item.additionalInfo}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
