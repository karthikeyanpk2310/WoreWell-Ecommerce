'use client';

import React, { createContext, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User as AppUser } from '@/types';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: AppUser | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (userData: Omit<AppUser, 'id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: firebaseUser, isUserLoading, userError } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  // Here you could fetch your custom user profile from Firestore
  // For now, we'll construct a mock AppUser from the firebaseUser
  const user: AppUser | null = firebaseUser ? {
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
      await signInWithEmailAndPassword(auth, email, password_unused);
      router.push('/');
    } catch (error: any) {
      console.error('Login failed', error);
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const signup = async (userData: Omit<AppUser, 'id' | 'createdAt'>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const { uid } = userCredential.user;

      const newUser: Omit<AppUser, 'password'> = {
        id: uid,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        address: userData.address,
        createdAt: new Date().toISOString(),
      };
      
      // Create a user document in Firestore
      const userDocRef = doc(firestore, 'users', uid);
      setDocumentNonBlocking(userDocRef, newUser, { merge: true });

      router.push('/?signup=success');
    } catch (error: any) {
      console.error('Signup failed', error);
      toast({
        title: 'Sign Up Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error: any) {
      console.error('Logout failed', error);
      toast({
        title: 'Logout Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading: isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
