import { Quote } from '@/types/quote';
import QuoteItem from './QuoteItem';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Package } from 'lucide-react';

interface QuoteListProps {
  quotes: Quote[];
  onSelect: (quoteId: string) => void;
  isLoading?: boolean;
  error?: string;
}

export default function QuoteList({
  quotes,
  onSelect,
  isLoading = false,
  error,
}: QuoteListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4" aria-label="Loading quotes">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No quotes yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Create your first quote to start tracking shipments and comparing carrier prices.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="list" aria-label="Quote list">
      {quotes.map((quote) => (
        <div key={quote.quoteId} role="listitem">
          <QuoteItem quote={quote} onClick={onSelect} />
        </div>
      ))}
    </div>
  );
}
