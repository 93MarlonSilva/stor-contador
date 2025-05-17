"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '@/types/login-types';

interface AuthContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 