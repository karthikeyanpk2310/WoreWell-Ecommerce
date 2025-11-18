'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { RatingStars } from '../shared/RatingStars';
import { useState } from 'react';
import { SizeSelector } from './SizeSelector';
import { AddToCartButton } from '../cart/AddToCartButton';
import { Button } from '../ui/button';
import { Sparkles, Flame, Trophy } from 'lucide-react';
import ProductDetailSheet from './ProductDetailSheet';

type ProductCardProps = {
  product: Product;
};

const tagIcons = {
  new: <Sparkles className="h-4 w-4" />,
  trending: <Flame className="h-4 w-4" />,
  'best-seller': <Trophy className="h-4 w-4" />,
};

export function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0] || null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-xl group">
        <CardHeader className="p-0 relative">
          <button onClick={() => setIsSheetOpen(true)} className="w-full">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={500}
              className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </button>
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.tags?.map(tag => (
              <Badge key={tag} variant="default" className="bg-accent text-accent-foreground capitalize flex items-center gap-1">
                {tagIcons[tag]}
                {tag}
              </Badge>
            ))}
          </div>
          <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'} className="absolute top-2 right-2">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-semibold truncate group-hover:text-primary">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">INR {product.price.toLocaleString()}</p>
            <div className="flex items-center gap-1">
              <RatingStars rating={product.rating} />
              <span className="text-sm text-muted-foreground">({product.rating})</span>
            </div>
          </div>
          <div className="opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
            <p className="text-sm text-muted-foreground capitalize mb-2">{product.gender}</p>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full flex flex-col gap-2">
            <div className="hidden group-hover:flex gap-2">
              <AddToCartButton product={product} selectedSize={selectedSize} quantity={1} />
              <Button variant="outline" className="w-full" onClick={() => setIsSheetOpen(true)}>Details</Button>
            </div>
            <div className="flex group-hover:hidden w-full">
                <Button variant="outline" className="w-full" onClick={() => setIsSheetOpen(true)}>View Product</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
      <ProductDetailSheet product={product} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
}
