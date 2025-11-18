'use client';

import { useAuth } from '@/hooks/useAuth';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Order } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';

function OrderItemCard({ item }: { item: Order['items'][0] }) {
    return (
        <div className="flex gap-4 items-center">
            <Image 
                src={item.image} 
                alt={item.name} 
                width={64} 
                height={80}
                className="rounded-md object-cover"
            />
            <div className="flex-grow">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">Size: {item.size} | Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">INR {(item.price * item.quantity).toLocaleString()}</p>
        </div>
    )
}

function OrderCard({ order }: { order: Order }) {
    return (
        <Card className="shadow-md">
            <CardHeader className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Order Placed</p>
                    <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Total</p>
                    <p className="font-semibold">INR {order.total.toLocaleString()}</p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <p className="font-semibold">{order.status}</p>
                </div>
                 <div>
                    <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                    <p className="font-semibold truncate text-xs">#{order.id}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator />
                {order.items.map((item, index) => (
                    <OrderItemCard key={index} item={item} />
                ))}
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
                <p className="text-sm font-semibold">Expected Delivery: <span className="text-primary">{new Date(order.deliveryDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
            </CardFooter>
        </Card>
    );
}

function OrdersSkeleton() {
    return (
        <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <div className="grid grid-cols-4 gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const firestore = useFirestore();

    const ordersQuery = useMemo(() => {
        if (!user) return null;
        return query(collection(firestore, `users/${user.id}/orders`), orderBy('createdAt', 'desc'));
    }, [user, firestore]);
    
    const { data: orders, isLoading: ordersLoading, error } = useCollection<Order>(ordersQuery);

    if (authLoading || (user && ordersLoading)) {
        return (
             <div className="space-y-8">
                <h1 className="text-4xl font-headline font-bold">My Orders</h1>
                <OrdersSkeleton />
            </div>
        );
    }
    
    if (!user) {
         return (
            <Alert>
                <AlertTitle>Not Logged In</AlertTitle>
                <AlertDescription>You need to be logged in to view your orders.</AlertDescription>
            </Alert>
        )
    }
    
    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Could not fetch your orders. Please try again later.</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-headline font-bold">My Orders</h1>
            {orders && orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
                    <h2 className="mt-4 text-2xl font-bold">No Orders Yet</h2>
                    <p className="mt-2 text-muted-foreground">You haven't placed any orders with us.</p>
                </div>
            )}
        </div>
    );
}
