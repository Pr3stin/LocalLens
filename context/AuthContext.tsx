"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/firebase"; 
import { onAuthStateChanged, User } from "firebase/auth";
import {
  signupEmail,
  loginEmail,
  loginGoogle,
  logoutUser,
} from "@/lib/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signupEmail: (email: string, password: string) => Promise<any>;
  loginEmail: (email: string, password: string) => Promise<any>;
  loginGoogle: () => Promise<any>;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Initializing Firebase auth...");
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false); 
    });

    
    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signupEmail,
    loginEmail,
    loginGoogle,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}