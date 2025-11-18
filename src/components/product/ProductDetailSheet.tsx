'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/types';
import { RatingStars } from '../shared/RatingStars';
import { SizeSelector } from './SizeSelector';
import { AddToCartButton } from '../cart/AddToCartButton';
import { Badge } from '../ui/badge';
import { Minus, Plus } from 'lucide-react';

type ProductDetailSheetProps = {
  product: Product;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function ProductDetailSheet({ product, isOpen, onOpenChange }: ProductDetailSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0] || null);
  
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl w-full p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="relative h-64 md:h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
          </div>
          <div className="flex flex-col">
            <div className="p-6 overflow-y-auto flex-grow">
              <SheetHeader className="text-left mb-4">
                <SheetTitle className="text-3xl font-headline">{product.name}</SheetTitle>
                <div className="flex items-center gap-4 pt-2">
                    <p className="text-2xl font-bold text-primary">INR {product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={product.rating} />
                      <span className="text-sm text-muted-foreground">({product.rating} stars)</span>
                    </div>
                </div>
                 <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'} className="w-fit mt-2">
                    {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                </Badge>
              </SheetHeader>
              <SheetDescription className="text-base">{product.description}</SheetDescription>
              <Separator className="my-6" />
              <div className="space-y-6">
                <div>
                    <h4 className="text-lg font-semibold mb-2">Size</h4>
                    <SizeSelector 
                        sizes={product.sizes}
                        selectedSize={selectedSize}
                        onSizeSelect={setSelectedSize}
                    />
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-2">Quantity</h4>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-xl font-bold w-10 text-center">{quantity}</span>
                         <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
              </div>
            </div>
            <SheetFooter className="p-6 bg-muted/50 border-t">
              <div className="w-full flex flex-col sm:flex-row gap-2">
                <AddToCartButton product={product} selectedSize={selectedSize} quantity={quantity} />
                <Button variant="gradient" className="w-full">Order Now</Button>
              </div>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
