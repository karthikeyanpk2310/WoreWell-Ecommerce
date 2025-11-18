'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { CartItem as CartItemType } from '@/types';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2 } from 'lucide-react';

type CartItemProps = {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <Card className="flex items-center p-4 gap-4 overflow-hidden">
            <Image 
                src={item.image} 
                alt={item.name} 
                width={100} 
                height={120} 
                className="rounded-md object-cover"
            />
            <div className="flex-grow space-y-2">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold w-5 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="text-right flex flex-col items-end justify-between h-full">
                <p className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.productId, item.size)}>
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Remove item</span>
                </Button>
            </div>
        </Card>
    );
}
