'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: { id: number; email: string; isAdmin?: boolean } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: number; email: string; isAdmin?: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage first for test user
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token');
          const storedUser = localStorage.getItem('user');
          
          if (token === 'test-token-123' && storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsLoading(false);
            return;
          }
        }

        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Check if we have a token stored in localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      checkAuth();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Login successful, setting user:', data.user);
        setUser(data.user);
        // Store token in localStorage
        localStorage.setItem('auth_token', data.token);
        // Redireciona admin para backoffice
        setTimeout(() => {
          if (data.user?.isAdmin) {
            router.push('/admin-backoffice');
          } else {
            router.push('/dashboard');
          }
        }, 100);
        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login.' };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Registering user with email:', email);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      console.log('AuthContext: Register API response status:', response.status);
      
      const data = await response.json();
      console.log('AuthContext: Register API response data:', data);
      
      if (response.ok) {
        return { success: true, message: 'Registration successful! You can now log in.' };
      } else {
        return { success: false, message: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration.' };
    }
  };

  const logout = async () => {
    setUser(null);
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    
    // Clear the auth cookie as well
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error clearing auth cookie:', error);
    }
    
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
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