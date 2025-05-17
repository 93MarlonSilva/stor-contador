import { UserData } from '@/types/login-types';
import { apiService } from './api-service';

interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<UserData> {
    // Configura as credenciais para Basic Auth
    apiService.setCredentials(credentials);
    
    // Faz a requisição de login
    const userData = await apiService.fetch<UserData>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    return userData;
  },

  logout() {
    apiService.clearCredentials();
  }
}; 