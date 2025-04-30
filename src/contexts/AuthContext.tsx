
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService } from '../services/database';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'shop_owner';
  city?: string;  // Added the city property as optional
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'customer' | 'shop_owner', city?: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userId: string, userData: Partial<User>) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('townshop_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use the database service
      const authenticatedUser = userService.authenticate(email, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser as User);
        localStorage.setItem('townshop_user', JSON.stringify(authenticatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: 'customer' | 'shop_owner',
    city?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = userService.getUserByEmail(email);
      if (existingUser) {
        return false;
      }
      
      // Use the database service
      const newUser = userService.createUser({
        name,
        email,
        password,
        role,
        city
      });
      
      // Create a sanitized version to store in state (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword as User);
      localStorage.setItem('townshop_user', JSON.stringify(userWithoutPassword));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile function
  const updateUserProfile = async (userId: string, userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the user in the database
      const updatedUser = userService.updateUser(userId, userData);
      
      if (updatedUser) {
        // Create a sanitized version to store in state (without password)
        const { password: _, ...userWithoutPassword } = updatedUser;
        
        setUser(userWithoutPassword as User);
        localStorage.setItem('townshop_user', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('townshop_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
