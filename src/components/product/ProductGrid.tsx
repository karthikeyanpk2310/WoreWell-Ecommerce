import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Shirt } from 'lucide-react';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
        <Alert>
            <Shirt className="h-4 w-4" />
            <AlertTitle>No Products Found</AlertTitle>
            <AlertDescription>
                Try adjusting your filters to find what you're looking for.
            </AlertDescription>
        </Alert>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
