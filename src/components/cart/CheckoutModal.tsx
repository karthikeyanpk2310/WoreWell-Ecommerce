'use client';

import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { useFirestore } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import type { Order } from "@/types";

type CheckoutModalProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function CheckoutModal({ isOpen, onOpenChange }: CheckoutModalProps) {
    const router = useRouter();
    const { user } = useAuth();
    const firestore = useFirestore();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { toast } = useToast();
    
    const handlePlaceOrder = () => {
        if (!user) {
            toast({
                title: "Not logged in",
                description: "You must be logged in to place an order.",
                variant: "destructive",
            });
            return;
        }

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);

        const newOrder: Omit<Order, 'id'> = {
            userId: user.id,
            items: cartItems,
            total: cartTotal,
            address: user.address,
            status: 'Placed',
            deliveryDate: deliveryDate.toISOString(),
            createdAt: new Date().toISOString(),
        };

        const ordersColRef = collection(firestore, 'users', user.id, 'orders');
        addDocumentNonBlocking(ordersColRef, newOrder);
        
        clearCart();
        router.push("/orders/success");
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your order will be placed as Cash on Delivery (COD). The total amount of 
                        <span className="font-bold text-foreground"> INR {cartTotal.toLocaleString()} </span> 
                        will be collected upon delivery.
                        <br/><br/>
                        Estimated delivery is within 3 business days.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePlaceOrder}>
                        Confirm and Place Order
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
