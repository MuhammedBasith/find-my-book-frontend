
import { Book as BookIcon, DollarSign, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Price {
  store: string;
  price: number;
  url: string;
}

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  prices: Price[];
  imageUrl?: string;
  isbn?: string;
}

export function BookCard({ id, title, author, prices, imageUrl, isbn }: BookCardProps) {
  const lowestPrice = Math.min(...prices.map(p => p.price));
  
  return (
    <Link to={`/book/${id}`}>
      <Card className="overflow-hidden hover-scale transition-all duration-300 bg-white/80 backdrop-blur-sm border border-gray-200">
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-24 h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <BookIcon className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">{author}</p>
              {isbn && (
                <p className="text-xs text-gray-500 mt-1">ISBN: {isbn}</p>
              )}
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-600">
                    ${lowestPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">lowest price</span>
                </div>
                <div className="mt-2 space-y-1">
                  {prices.map((price, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={price.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Store className="w-4 h-4" />
                            <span>{price.store}</span>
                            <span className="font-medium">${price.price.toFixed(2)}</span>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View on {price.store}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
