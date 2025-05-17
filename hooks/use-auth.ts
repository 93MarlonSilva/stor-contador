import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth-service';
import { useAuth } from '@/components/providers/auth-provider';

export function useAuthLogin() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email: string, password: string) => {
    setError('');
    setIsLoading(true);

    try {
      const userData = await authService.login({ email, password });
      setUser(userData);
      router.push('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error
  };
} 