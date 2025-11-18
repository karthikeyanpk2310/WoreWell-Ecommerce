'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/types';
import { FilterPanel } from './FilterPanel';
import { ProductGrid } from './ProductGrid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '../ui/button';
import { SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useIsMobile } from '@/hooks/use-mobile';


type Filters = {
  gender: string[];
  size: string[];
  priceRange: [number, number];
  rating: number;
};

export function ShopPageClient({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>({
    gender: [],
    size: [],
    priceRange: [0, 5000],
    rating: 0,
  });
  const [sortOption, setSortOption] = useState('popular');
  const isMobile = useIsMobile();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.gender.length > 0 && !filters.gender.includes(product.gender)) {
        return false;
      }
      if (filters.size.length > 0 && !filters.size.some(s => product.sizes.includes(s as any))) {
        return false;
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      if (product.rating < filters.rating) {
        return false;
      }
      return true;
    });

    switch (sortOption) {
      case 'new':
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'popular':
      default:
        return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [products, filters, sortOption]);

  const FilterPanelContent = () => (
     <FilterPanel filters={filters} onFilterChange={setFilters} />
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="hidden lg:block lg:col-span-1">
        <FilterPanelContent />
      </div>

      <div className="lg:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">{filteredAndSortedProducts.length} Products</p>
          
          <div className="flex items-center gap-4">
             {isMobile && (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="sr-only">Filters</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <div className="p-4 overflow-y-auto">
                      <h2 className="text-lg font-semibold mb-4">Filters</h2>
                      <FilterPanelContent />
                    </div>
                  </SheetContent>
                </Sheet>
              )}

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ProductGrid products={filteredAndSortedProducts} />
      </div>
    </div>
  );
}
