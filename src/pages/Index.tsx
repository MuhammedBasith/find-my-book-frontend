import { useState } from 'react';
import axios from 'axios'; // Import Axios for making the API request
import { SearchBar } from '@/components/SearchBar';
import { BookResults } from '@/components/BookResults';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, BookOpen, Search, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function Index() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<any>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/api/v1/book`, { bookName: query });
  
      const { success, data } = response.data;
  
  
      if (success && data) {

        const formattedBooks = [{
          id: 1,
          title: data.title,
          author: data.authors.join(', '),
          imageUrl: data.thumbnail,
          prices: Object.keys(data.prices).map((store) => ({
            store,
            price: data.prices[store],
          })),
        }];
  
        setBooks(formattedBooks);
  
        toast({
          title: "Search completed",
          description: `Found 1 book matching "₹{query}"`,
        });
      } else {
        toast({
          title: "No books found",
          description: `No books found matching "₹{query}". Please try again.`,
        });
        setBooks([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching book data. Please try again.",
      });
      console.log(error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Find Your Next Book at the{' '}
                <span className="text-violet-600">Best Price</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Compare prices across multiple stores instantly. Save time and money finding the perfect book deal.
              </p>
              <SearchBar 
                onSearch={handleSearch}
                className="mb-12"
              />
            </div>

            {!hasSearched && !isLoading && (
              <div className="mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
                    <p className="text-gray-600">Find books by title, author, ISBN, or keywords across multiple stores instantly</p>
                  </div>
                  <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Price Compare</h3>
                    <p className="text-gray-600">Compare prices from multiple retailers to find the best deals available</p>
                  </div>
                  <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Price History</h3>
                    <p className="text-gray-600">Track price changes over time and get notified of the best time to buy</p>
                  </div>
                </div>

                <div className="text-left bg-white rounded-3xl p-12 shadow-sm">
                  <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-semibold mr-4">
                          1
                        </div>
                        <h3 className="text-xl font-semibold">Search</h3>
                      </div>
                      <p className="text-gray-600 mb-6">Enter the book title, author, or ISBN you're looking for</p>
                      <ArrowRight className="hidden md:block absolute -right-4 top-10 text-gray-300" />
                    </div>
                    <div className="relative">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-semibold mr-4">
                          2
                        </div>
                        <h3 className="text-xl font-semibold">Compare</h3>
                      </div>
                      <p className="text-gray-600 mb-6">View prices from multiple retailers side by side</p>
                      <ArrowRight className="hidden md:block absolute -right-4 top-10 text-gray-300" />
                    </div>
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-semibold mr-4">
                          3
                        </div>
                        <h3 className="text-xl font-semibold">Save</h3>
                      </div>
                      <p className="text-gray-600 mb-6">Get the best deal and save money on your purchase</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Business', 'Technology', 'Arts'].map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        className="p-6 h-auto text-lg bg-white/80 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mt-24 text-center">
                  <h2 className="text-3xl font-bold mb-8">Trusted by Book Lovers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[{ number: "1M+", label: "Books Compared" }, { number: "50K+", label: "Happy Readers" }, { number: "30+", label: "Trusted Retailers" }].map((stat) => (
                      <div key={stat.label} className="p-6">
                        <div className="text-4xl font-bold text-violet-600 mb-2">{stat.number}</div>
                        <div className="text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {(hasSearched || isLoading) && (
            <BookResults 
              books={books}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
