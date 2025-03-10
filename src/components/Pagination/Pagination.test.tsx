// src/components/Pagination/Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('handles circular navigation', () => {
    const mockChange = jest.fn();
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockChange}
        isCircular
      />
    );

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(mockChange).toHaveBeenCalledWith(1);
  });

  test('disables buttons in normal mode', () => {
    const { rerender } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    );

    expect(screen.getByLabelText('Previous page')).toBeDisabled();

    rerender(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });
});