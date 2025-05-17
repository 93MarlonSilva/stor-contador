interface ApiConfig {
  baseURL: string;
  credentials?: {
    email: string;
    password: string;
  };
}

class ApiService {
  private baseURL: string;
  private credentials: { email: string; password: string } | null = null;

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
    console.log('API Base URL:', this.baseURL);
    if (config.credentials) {
      this.setCredentials(config.credentials);
    }
  }

  setCredentials(credentials: { email: string; password: string }) {
    this.credentials = credentials;
    console.log('Credentials set for user:', credentials.email);
  }

  clearCredentials() {
    this.credentials = null;
    console.log('Credentials cleared');
  }

  private getBasicAuthHeader(): Record<string, string> {
    if (!this.credentials) {
      console.log('No credentials available for Basic Auth');
      return {};
    }
    
    const { email, password } = this.credentials;
    const auth = btoa(`${email}:${password}`);
    console.log('Basic Auth header generated for:', email);
    return {
      'Authorization': `Basic ${auth}`
    };
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorMessage = 'Erro na requisição';

    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || 'Erro na requisição';
      } else {
        // Se não for JSON, tenta ler como texto
        const text = await response.text();
        // Verifica se é um HTML ou outro formato inválido
        if (text.includes('<!DOCTYPE') || text.includes('<html')) {
          errorMessage = 'Não foi possível logar com as credenciais fornecidas';
        } else {
          errorMessage = text;
        }
      }
    } catch (error) {
      console.error('Error parsing error response:', error);
      errorMessage = 'Erro ao processar resposta do servidor';
    }

    throw new Error(errorMessage);
  }

  private addOriginParameter(url: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}origin=painel`;
  }

  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const baseUrl = `${this.baseURL}${endpoint}`;
    const url = this.addOriginParameter(baseUrl);
    console.log('Making request to:', url);
    
    const headers = {
      'Content-Type': 'application/json',
      ...this.getBasicAuthHeader(),
      ...(options.headers || {}),
    };

    console.log('Request headers:', headers);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        return this.handleErrorResponse(response);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao processar requisição');
    }
  }
}

// Criando uma instância do serviço com variáveis de ambiente
export const apiService = new ApiService({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5974',
  credentials: process.env.NEXT_PUBLIC_API_USER && process.env.NEXT_PUBLIC_API_PASSWORD ? {
    email: process.env.NEXT_PUBLIC_API_USER,
    password: process.env.NEXT_PUBLIC_API_PASSWORD
  } : undefined
});
