'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
    const [deliveryDate, setDeliveryDate] = useState('');

    useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        setDeliveryDate(date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg text-center p-8 shadow-2xl">
                <CardHeader>
                    <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                    <CardTitle className="text-3xl font-headline mt-4">Order Placed Successfully!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Thank you for your purchase. Your order is being processed and will be delivered soon.
                    </p>
                    {deliveryDate && (
                         <p className="font-semibold text-lg">
                            Expected Delivery by: <span className="text-primary">{deliveryDate}</span>
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        You will receive an email confirmation shortly.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Button asChild variant="gradient" className="flex-1">
                            <Link href="/shop">Continue Shopping</Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                            <Link href="#">View Orders</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
