import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/service/authService';

interface User {
  id: string;
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
      
      console.log('[useAuth] Authentication check:', authenticated);
    };

    checkAuth();
  }, []);

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
  };
};