import React, { createContext, useContext, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';

interface AuthContextType {
  user: string | null;
  isAdmin: boolean;
  login: (username: string, password?: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (username: string, password?: string) => {
    try {
      const usersRef = collection(db, 'users');
      const q = password 
        ? query(usersRef, where('username', '==', username), where('password', '==', password), where('isAdmin', '==', true))
        : query(usersRef, where('username', '==', username), where('isAdmin', '==', false));
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setUser(username);
        setIsAdmin(!!password);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string) => {
    try {
      // Check if username already exists
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return false; // Username already exists
      }

      // Add new user
      await addDoc(collection(db, 'users'), {
        username,
        isAdmin: false,
        createdAt: new Date().toISOString()
      });

      setUser(username);
      setIsAdmin(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, register }}>
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