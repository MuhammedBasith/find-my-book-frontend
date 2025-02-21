
import { BookCard } from './BookCard';

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
}

interface BookResultsProps {
  books: Book[];
  isLoading: boolean;
}

export function BookResults({ books, isLoading }: BookResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-gray-600">No books found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {books.map((book, index) => (
        <div
          key={book.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <BookCard {...book} />
        </div>
      ))}
    </div>
  );
}
