// src/hooks/usePagination.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { PaginationManager } from './PaginationClass';

export const usePagination = (initialTotalPages: number, isCircular = false) => {

  const paginationRef = useRef<PaginationManager>(new PaginationManager(initialTotalPages, isCircular));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  useEffect(() => {
    paginationRef.current = new PaginationManager(initialTotalPages, isCircular);
    setCurrentPage(1);
  }, [initialTotalPages, isCircular]);

  const update = useCallback(() => {
    setCurrentPage((paginationRef.current as PaginationManager).getCurrentPage()); 
  }, []);

  const jump = useCallback((page: number) => {
    (paginationRef.current as PaginationManager).jump(page); 
    update();
  }, [update]);

  const next = useCallback(() => {
    (paginationRef.current as PaginationManager).next(); 
    update();
  }, [update]);

  const previous = useCallback(() => {
    (paginationRef.current as PaginationManager).previous(); 
    update();
  }, [update]);

  const jumpForward = useCallback((pages: number) => {
    (paginationRef.current as PaginationManager).jumpForward(pages); 
    update();
  }, [update]);

  const jumpBackward = useCallback((pages: number) => {
    (paginationRef.current as PaginationManager).jumpBackward(pages); 
    update();
  }, [update]);

  const updateTotalPages = useCallback((newTotal: number) => {
    (paginationRef.current as PaginationManager).setTotalPages(newTotal); 
    setTotalPages(newTotal);
    update();
  }, [update]);

  return {
    currentPage,
    totalPages,
    jump,
    next,
    previous,
    jumpForward,
    jumpBackward,
    setTotalPages: updateTotalPages,
  };
};