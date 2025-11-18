'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

type AddToCartButtonProps = {
  product: Product;
  selectedSize: string | null;
  quantity: number;
};

export function AddToCartButton({ product, selectedSize, quantity }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Select a size',
        description: 'Please select a size before adding to cart.',
        variant: 'destructive',
      });
      return;
    }
    
    if (product.stock <= 0) {
      toast({
        title: 'Out of stock',
        description: 'This product is currently out of stock.',
        variant: 'destructive',
      });
      return;
    }

    addToCart(product, selectedSize, quantity);
    toast({
      title: 'Added to cart!',
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  return (
    <Button onClick={handleAddToCart} disabled={!selectedSize || product.stock <= 0} className="w-full">
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
