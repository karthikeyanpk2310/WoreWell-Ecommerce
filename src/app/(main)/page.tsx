
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockProducts } from '@/lib/data';
import type { Product } from '@/types';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import { WelcomeHero } from '@/components/home/WelcomeHero';
import { useAuth } from '@/hooks/useAuth';
import { useMemo } from 'react';
import { CarouselSkeleton } from '@/components/home/CarouselSkeleton';
import { Confetti } from '@/components/shared/Confetti';

// Using a wrapper to avoid the entire page being dynamic just for search params.
const ConfettiWrapper = () => {
  const searchParams = useSearchParams();
  const showConfetti = searchParams.get('signup') === 'success';

  return showConfetti ? <Confetti /> : null;
};

// This component is client-side to access user context for personalization.
export default function HomePage() {
  const { user, loading } = useAuth();

  // TODO: Fetch products from API: GET /api/products
  const products: Product[] = mockProducts;

  const bestPicks = useMemo(() => {
    // If loading or no user, show some popular items as a fallback.
    if (loading || !user) {
      return products.filter(p => p.tags?.includes('best-seller')).slice(0, 8);
    }
    
    let genderFilter: Product['gender'];
    if (user.gender === 'male') {
      genderFilter = 'male';
    } else if (user.gender === 'female') {
      genderFilter = 'female';
    } else { // 'other' maps to 'unisex'
      genderFilter = 'unisex';
    }

    const filtered = products.filter(p => p.gender === genderFilter);
    // Fallback if no products match the user's gender
    return filtered.length > 0 ? filtered.slice(0, 8) : products.slice(0, 8);
  }, [user, loading, products]);

  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);
    
  const trending = products.filter(p => p.tags?.includes('trending')).slice(0, 8);

  return (
    <div className="space-y-12">
      <Suspense fallback={null}>
        <ConfettiWrapper />
      </Suspense>
      <WelcomeHero />
      
      {loading ? <CarouselSkeleton /> : (
        <ProductCarousel 
          title="Best Picks for You" 
          products={bestPicks}
          description="Curated collection based on your preferences."
        />
      )}

      <ProductCarousel 
        title="New Arrivals" 
        products={newArrivals}
        description="Check out the latest styles in our collection."
      />

      <ProductCarousel
        title="Trending Dresses"
        products={trending}
        description="See what's popular right now."
      />
    </div>
  );
}
