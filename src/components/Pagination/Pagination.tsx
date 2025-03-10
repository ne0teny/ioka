// src/components/Pagination/Pagination.tsx
import React, { useEffect, useRef } from 'react';
import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isCircular?: boolean;
  jumpStep?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isCircular = false,
  jumpStep = 3,
}) => {
  const pageRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    pageRef.current?.focus();
  }, [currentPage]);

  const handleNavigation = (delta: number) => {
    const newPage = currentPage + delta;
    
    if (newPage < 1) {
      onPageChange(isCircular ? totalPages : 1);
    } else if (newPage > totalPages) {
      onPageChange(isCircular ? 1 : totalPages);
    } else {
      onPageChange(newPage);
    }
  };

  return (
    <nav aria-label="Pagination">
      <div className="pagination">
        <button
          onClick={() => handleNavigation(-jumpStep)}
          aria-label={`Jump back ${jumpStep} pages`}
          disabled={!isCircular && currentPage === 1}
        >
          &lt;&lt;
        </button>

        <button
          onClick={() => handleNavigation(-1)}
          aria-label="Previous page"
          disabled={!isCircular && currentPage === 1}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            ref={i + 1 === currentPage ? pageRef : null}
            onClick={() => onPageChange(i + 1)}
            className={i + 1 === currentPage ? 'active' : ''}
            aria-current={i + 1 === currentPage ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handleNavigation(1)}
          aria-label="Next page"
          disabled={!isCircular && currentPage === totalPages}
        >
          &gt;
        </button>

        <button
          onClick={() => handleNavigation(jumpStep)}
          aria-label={`Jump forward ${jumpStep} pages`}
          disabled={!isCircular && currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </nav>
  );
};

export default Pagination;