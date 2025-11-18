'use client';

import { useUser as useFirebaseUser, useAuth as useFirebaseAuth, useDoc } from "@/firebase";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, DocumentReference } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import type { User } from "@/types";
import { useMemo } from "react";

export const useAuth = () => {
  const { user: firebaseUser, isUserLoading, userError } = useFirebaseUser();
  const auth = useFirebaseAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const userDocRef = useMemo(() => {
    if (!firestore || !firebaseUser) return null;
    return doc(firestore, "users", firebaseUser.uid) as DocumentReference<User>;
  }, [firestore, firebaseUser]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<User>(userDocRef);

  const user: User | null = firebaseUser && userProfile ? userProfile : null;

  const loading = isUserLoading || (firebaseUser && isProfileLoading);

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
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const { uid } = userCredential.user;

      const newUser: Omit<User, 'password'> = {
          id: uid,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          gender: userData.gender,
          address: userData.address,
          createdAt: new Date().toISOString(),
      };
      const userDocRef = doc(firestore, "users", uid);
      setDocumentNonBlocking(userDocRef, newUser, { merge: true });
      
      router.push('/?signup=success');

    } catch (error: any)
      {
      console.error("Signup failed", error);
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        description = "This email is already registered. Please login or use a different email.";
      }
      toast({
        title: "Sign Up Failed",
        description: description,
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
