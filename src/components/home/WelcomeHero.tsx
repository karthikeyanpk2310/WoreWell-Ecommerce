'use client';

import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

export function WelcomeHero() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
        <div className="p-8 rounded-lg bg-card border shadow-sm">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2" />
        </div>
    );
  }

  const firstName = user.name.split(' ')[0];
  const addressSnippet = user.address.split(',').slice(0, 2).join(',');

  const getEmoji = () => {
    switch (user.gender) {
        case 'male':
            return '👨';
        case 'female':
            return '👩';
        default:
            return '👋';
    }
  }

  return (
    <div className="p-8 rounded-lg bg-card border shadow-sm">
      <h1 className="text-4xl font-headline font-bold text-foreground">
        Welcome back, {firstName} {getEmoji()}
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Delivering to: <span className="font-semibold text-foreground">{addressSnippet}</span>
      </p>
    </div>
  );
}
