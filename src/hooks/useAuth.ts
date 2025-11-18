'use client';
import { useUser as useFirebaseUser, useAuth as useFirebaseAuth } from "@/firebase";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { initiateEmailSignIn, initiateEmailSignUp } from "@/firebase/non-blocking-login";
import type { User } from "@/types";

export const useAuth = () => {
  const { user: firebaseUser, isUserLoading: loading, userError } = useFirebaseUser();
  const auth = useFirebaseAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const user: User | null = firebaseUser ? {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'Wore Well User',
      email: firebaseUser.email || '',
      phone: firebaseUser.phoneNumber || '',
      gender: 'other', // This should be fetched from your user profile in Firestore
      address: '', // This should also be in the user profile
      createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
    } : null;

  const login = async (email: string, password_unused: string) => {
    try {
      initiateEmailSignIn(auth, email, password_unused);
      router.push('/');
    } catch (error: any) {
      console.error("Login failed", error);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt' | 'password'> & {password: string}) => {
    try {
        initiateEmailSignUp(auth, userData.email, userData.password);
        
        // The user object won't be available immediately,
        // so we have to listen for auth state changes.
        // For now, let's assume it works and optimistically navigate.
        // A more robust solution would use onAuthStateChanged to trigger the doc creation.
        
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const newUser: Omit<User, 'password'> = {
                    id: user.uid,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    gender: userData.gender,
                    address: userData.address,
                    createdAt: new Date().toISOString(),
                };
                const userDocRef = doc(firestore, "users", user.uid);
                setDocumentNonBlocking(userDocRef, newUser, { merge: true });
                unsubscribe(); // Unsubscribe after we have the user.
                router.push('/?signup=success');
            }
        });

    } catch (error: any) {
      console.error("Signup failed", error);
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error: any) {
      console.error("Logout failed", error);
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { user, loading, login, signup, logout };
};
