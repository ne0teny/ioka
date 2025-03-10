// src/App.tsx
import React, { useState } from 'react';
import Pagination from './components/Pagination/Pagination';
import { usePagination } from './hooks/usePagination';

const App: React.FC = () => {
  const [total, setTotal] = useState(10);
  const { 
    currentPage, 
    jump, 
    jumpForward, 
    jumpBackward, 
    setTotalPages 
  } = usePagination(total, true);

  return (
    <div className="app">
      <div className="controls">
        <label>
          Total Pages:
          <input
            type="number"
            value={total}
            onChange={(e) => {
              const rawValue = parseInt(e.target.value) || 1;
              const value = Math.max(1, rawValue);
              setTotalPages(value);
              setTotal(value);
            }}
            min="1"
          />
        </label>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={total}
        onPageChange={jump}
        isCircular={true}
        jumpStep={3}
      />

      <div className="debug-info">
        <button onClick={() => jumpBackward(3)}>Jump -3</button>
        <button onClick={() => jumpForward(3)}>Jump +3</button>
        <p>Current Page: {currentPage}</p>
      </div>
    </div>
  );
};

export default App;