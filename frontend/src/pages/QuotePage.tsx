import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import QuoteForm from '@/components/QuoteForm';
import PriceCard from '@/components/PriceCard';
import { useSubmitQuote } from '@/hooks/useQuotes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { Quote } from '@/types/quote';
import { apiClient } from '@/services/api';

export default function QuotePage() {
  const navigate = useNavigate();
  const [successQuote, setSuccessQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const submitQuote = useSubmitQuote();

  const handleLogout = () => {
    apiClient.setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('clientId');
    navigate('/login');
  };

  const handleSubmit = async (payload: any) => {
    setError(null);
    setSuccessQuote(null);
    try {
      const result = await submitQuote.mutateAsync(payload);
      setSuccessQuote(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate quote. Please try again.');
    }
  };

  const userName = localStorage.getItem('userName') || undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={handleLogout} userName={userName} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Get a Shipping Quote</h1>
            <p className="text-lg text-muted-foreground">
              Enter your shipment details to receive instant pricing
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successQuote && (
            <Alert className="border-success bg-success/10">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <AlertDescription className="text-success-foreground">
                Quote generated successfully! Correlation ID: {successQuote.correlationId}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-8 md:grid-cols-1">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Shipment Information</CardTitle>
                <CardDescription>
                  Fill in the details of your package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuoteForm onSubmit={handleSubmit} />
              </CardContent>
            </Card>

            {successQuote && (
              <div className="md:col-span-1">
                <PriceCard
                  negotiatedCost={successQuote.negotiatedCost}
                  markupPercent={15}
                  fixedFee={5}
                  finalPrice={successQuote.finalPrice}
                  currency="BRL"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
