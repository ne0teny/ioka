// src/hooks/PaginationClass.ts
export class PaginationManager {
  private currentPage: number;
  private totalPages: number;
  private readonly isCircular: boolean;

  constructor(totalPages: number, isCircular = false) {
    this.validateTotalPages(totalPages);
    this.currentPage = 1;
    this.totalPages = totalPages;
    this.isCircular = isCircular;
  }

  // Явно объявляем все публичные методы
  public next(): void {
    if (this.isCircular) {
      this.currentPage = this.currentPage === this.totalPages ? 1 : this.currentPage + 1;
    } else {
      this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
    }
  }

  public previous(): void {
    if (this.isCircular) {
      this.currentPage = this.currentPage === 1 ? this.totalPages : this.currentPage - 1;
    } else {
      this.currentPage = Math.max(this.currentPage - 1, 1);
    }
  }

  public jump(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  public jumpForward(pages: number): void {
    const newPage = this.isCircular
      ? ((this.currentPage + pages - 1) % this.totalPages) + 1
      : Math.min(this.currentPage + pages, this.totalPages);
    this.jump(newPage);
  }

  public jumpBackward(pages: number): void {
    const newPage = this.isCircular
      ? ((this.currentPage - pages - 1 + this.totalPages) % this.totalPages) + 1
      : Math.max(this.currentPage - pages, 1);
    this.jump(newPage);
  }

  public setTotalPages(newTotal: number): void {
    this.validateTotalPages(newTotal);
    this.totalPages = newTotal;
    this.jump(Math.min(this.currentPage, newTotal));
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  private validateTotalPages(pages: number): void {
    if (!Number.isInteger(pages) || pages < 1) {
      throw new Error('Total pages must be a positive integer');
    }
  }
}