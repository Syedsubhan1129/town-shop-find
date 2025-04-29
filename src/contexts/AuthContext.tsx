
import React, { createContext, useState, useContext, useEffect } from "react";
import { User, users } from "../utils/data";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  register: (name: string, email: string, password: string, role: 'customer' | 'shop_owner') => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("townshop_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = users.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem("townshop_user", JSON.stringify(foundUser));
          resolve(true);
        } else {
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  // Mock register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'customer' | 'shop_owner'
  ): Promise<boolean> => {
    // In a real app, this would be an API call
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          resolve(false);
        } else {
          const newUser: User = {
            id: (users.length + 1).toString(),
            name,
            email,
            role,
          };
          users.push(newUser);
          setUser(newUser);
          localStorage.setItem("townshop_user", JSON.stringify(newUser));
          resolve(true);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("townshop_user");
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
