'use client';

import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function WelcomeHero() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
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

  return (
    <div className="p-8 rounded-lg bg-card border shadow-sm">
      <h1 className="text-4xl font-headline font-bold text-foreground">
        Welcome back, {firstName} 👋
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Delivering to: <span className="font-semibold text-foreground">{addressSnippet}</span>
      </p>
    </div>
  );
}
