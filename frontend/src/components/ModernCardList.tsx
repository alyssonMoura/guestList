import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export interface CardItem {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  additionalInfo?: string;
}

interface ModernCardListProps {
  items: CardItem[];
  baseRoute: string;
  loading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  title?: string;
  itemsPerPage?: number;
}

export const ModernCardList: React.FC<ModernCardListProps> = ({
  items,
  baseRoute,
  loading = false,
  emptyMessage = "Nenhum item encontrado.",
  loadingMessage = "Carregando...",
  title,
  itemsPerPage = 6
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="loading">
        <div>{loadingMessage}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <div>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="modern-subtitle text-center mb-4">
          {title}
        </h2>
      )}
      
      <div className="card-list">
        {paginatedItems.map(item => (
          <Link
            key={item.id}
            to={`${baseRoute}/${item.id}`}
            className="card-list-item"
          >
            <div className="card card-compact">
              <div className="card-header">
                <h3 className="card-title">
                  {item.title}
                </h3>
              </div>
              {/* divs em linha */}
              <div className="card-content">
                {item.subtitle && (
                  <div className="card-subtitle">
                    {item.subtitle}
                  </div>
                )}
              
              {item.description && (
                <div className="card-description">
                  {item.description}
                </div>
              )}
              
              {item.additionalInfo && (
                <div className="card-description">
                  {item.additionalInfo}
                </div>
              )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          
          {getPageNumbers().map(page => (
            <button
              key={page}
              className={`btn btn-sm ${
                page === currentPage ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima →
          </button>
          
          <div className="pagination-info">
            Página {currentPage} de {totalPages} ({items.length} itens)
          </div>
        </div>
      )}
    </div>
  );
};

