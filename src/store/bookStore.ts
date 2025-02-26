// src/store/bookStore.ts
import { create } from 'zustand';

interface Price {
  store: string;
  price: number;
  url: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  prices: Price[];
  imageUrl?: string;
  isbn?: string;
  description?: string;
  publishedDate?: string;
  publisher?: string;
  pageCount?: number;
}

interface BookStore {
  selectedBook: Book | null;
  setSelectedBook: (book: Book) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  selectedBook: null,
  setSelectedBook: (book: Book) => set({ selectedBook: book }),
}));
