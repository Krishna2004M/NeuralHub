import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiService } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  apiKey?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  updateApiKey: (key: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.apiKey) {
        apiService.setApiKey(parsedUser.apiKey);
      }
    }
  }, []);

  const updateApiKey = (key: string) => {
    if (user) {
      const updatedUser = { ...user, apiKey: key };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      apiService.setApiKey(key);
      toast.success('API key updated successfully');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Mock API call - replace with actual authentication
      const mockUser = {
        id: '1',
        email,
        name: 'John Doe',
        apiKey: localStorage.getItem('openai_key'),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      if (mockUser.apiKey) {
        apiService.setApiKey(mockUser.apiKey);
      }
      toast.success('Successfully signed in!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to sign in');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Mock API call - replace with actual registration
      const mockUser = {
        id: '1',
        email,
        name,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Successfully created account!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account');
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('openai_key');
    toast.success('Successfully signed out');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateApiKey }}>
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