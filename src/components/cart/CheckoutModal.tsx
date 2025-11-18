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

type CheckoutModalProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export default function CheckoutModal({ isOpen, onOpenChange }: CheckoutModalProps) {
    const router = useRouter();
    const { clearCart, cartTotal } = useCart();
    
    const handlePlaceOrder = () => {
        // TODO: POST /api/orders
        // This is where you would make an API call to your backend
        console.log("Placing order...");
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
                        <span className="font-bold text-foreground"> ₹{cartTotal.toLocaleString()} </span> 
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
