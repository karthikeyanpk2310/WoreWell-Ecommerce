
'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, setAuthToken, removeAuthToken } from '@/lib/auth';
import type { User } from '@/types';

// TODO: Replace with actual API calls
// For now, we'll use mock data and simulate API calls

const MOCK_USER: User = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '9876543210',
  gender: 'female',
  address: '123, Fashion Street, Mumbai, India',
  createdAt: new Date().toISOString(),
};

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifyToken = useCallback(async () => {
    const token = getAuthToken();
    if (token) {
      // TODO: Call API to verify token and get user data
      // For now, we just simulate a successful verification
      try {
        await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
        setUser(MOCK_USER);
      } catch (error) {
        console.error('Token verification failed', error);
        removeAuthToken();
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);
  
  const login = async (email: string, password_unused: string) => {
    // TODO: POST /api/auth/login
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { ... });
    console.log('Logging in with', email);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    const mockToken = 'fake-jwt-token';
    setAuthToken(mockToken);
    setUser(MOCK_USER);
    router.push('/');
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    // TODO: POST /api/auth/register
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { ... });
    console.log('Signing up with', userData);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    const mockToken = 'fake-jwt-token';
    setAuthToken(mockToken);
    setUser({ ...MOCK_USER, ...userData });
    router.push('/?signup=success');
  };
  
  const logout = () => {
    // TODO: Call backend to invalidate token if necessary
    removeAuthToken();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
