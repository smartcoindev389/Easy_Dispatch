import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, TrendingUp, Shield, Zap } from 'lucide-react';
import { apiClient } from '@/services/api';

export default function Index() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    apiClient.setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('clientId');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const features = [
    {
      icon: Zap,
      title: 'Instant Quotes',
      description: 'Get shipping quotes in seconds from multiple carriers',
    },
    {
      icon: TrendingUp,
      title: 'Price Transparency',
      description: 'Clear breakdown of costs, markups, and final pricing',
    },
    {
      icon: Shield,
      title: 'Reliable Tracking',
      description: 'Track all quotes with correlation IDs and real-time updates',
    },
    {
      icon: Package,
      title: 'Multi-Carrier',
      description: 'Compare rates from FedEx, UPS, DHL, and more',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Package className="h-8 w-8 text-primary" />
            Easy Dispatch
          </div>
          {!isAuthenticated && (
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          )}
          {isAuthenticated && (
            <Button onClick={handleLogout}>Sign Out</Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-16 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Shipping Quotes
              <br />
              <span className="text-primary">Made Simple</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Professional logistics quote management for businesses of all sizes.
              Compare carriers, track quotes, and manage your shipping efficiently.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              {!isAuthenticated && (
                <>
                  <Button
                    size="lg"
                    onClick={() => navigate('/signup')}
                    className="text-lg px-8"
                  >
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="text-lg px-8"
                  >
                    Sign In
                  </Button>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Button
                    size="lg"
                    onClick={() => navigate('/quote')}
                    className="text-lg px-8"
                  >
                    New Quote
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="text-lg px-8"
                  >
                    Dashboard
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <CardContent className="p-6 text-left">
                  <feature.icon className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-8">
            <h2 className="mb-4 text-2xl font-bold">Ready to streamline your shipping?</h2>
            <p className="mb-6 text-muted-foreground">
              Join businesses using Easy Dispatch to save time and money on logistics.
            </p>
            {!isAuthenticated && (
              <Button size="lg" onClick={() => navigate('/signup')}>
                Start Now
              </Button>
            )}
            {isAuthenticated && (
              <Button size="lg" onClick={() => navigate('/quote')}>
                New Quote
              </Button> 
            )}
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 Easy Dispatch. Built for efficient logistics management.</p>
      </footer>
    </div>
  );
}
