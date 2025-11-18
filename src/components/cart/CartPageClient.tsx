'use client';

import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

export function CartPageClient() {
    const { cartItems, cartTotal, itemCount } = useCart();
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    if (itemCount === 0) {
        return (
            <div className="text-center py-20">
                <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
                <h1 className="mt-4 text-3xl font-bold font-headline">Your cart is empty</h1>
                <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6" variant="gradient">
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        );
    }
    
    return (
        <>
            <h1 className="text-4xl font-headline font-bold mb-8">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <CartItem key={`${item.productId}-${item.size}`} item={item} />
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <Card className="sticky top-24 shadow-lg">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal ({itemCount} items)</span>
                                <span>INR {cartTotal.toLocaleString()}</span>
                            </div>
                             <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">FREE</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>INR {cartTotal.toLocaleString()}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="gradient" className="w-full hover:scale-105 transition-transform" onClick={() => setIsCheckoutModalOpen(true)}>
                                Place Order
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <CheckoutModal isOpen={isCheckoutModalOpen} onOpenChange={setIsCheckoutModalOpen} />
        </>
    );
}
