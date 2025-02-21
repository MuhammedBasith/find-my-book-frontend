
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, DollarSign, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Temporary mock data - would be replaced with real data fetching
const getMockBook = (id: string) => ({
  id,
  title: "The Midnight Library",
  author: "Matt Haig",
  isbn: "9780525559474",
  description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
  imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
  prices: [
    { store: "Amazon", price: 14.99, url: "#" },
    { store: "BookStore", price: 16.99, url: "#" },
    { store: "Library", price: 12.99, url: "#" },
  ],
  publishedDate: "2020-08-13",
  publisher: "Viking",
  pageCount: 304,
});

export default function BookDetail() {
  const { id } = useParams();
  const book = getMockBook(id || '');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-6 hover:bg-white/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm animate-fade-in">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden">
                  {book.imageUrl ? (
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">ISBN</p>
                    <p className="font-medium">{book.isbn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Publisher</p>
                    <p className="font-medium">{book.publisher}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Published Date</p>
                    <p className="font-medium">{book.publishedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pages</p>
                    <p className="font-medium">{book.pageCount}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-8">{book.description}</p>

                <Card className="bg-gray-50 p-6">
                  <h2 className="text-xl font-semibold mb-4">Available Prices</h2>
                  <div className="space-y-4">
                    {book.prices.map((price, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={price.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-3">
                                <Store className="w-5 h-5 text-gray-600" />
                                <span className="font-medium">{price.store}</span>
                              </div>
                              <div className="flex items-center gap-1 text-green-600">
                                <DollarSign className="w-4 h-4" />
                                <span className="font-bold">{price.price.toFixed(2)}</span>
                              </div>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View on {price.store}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
