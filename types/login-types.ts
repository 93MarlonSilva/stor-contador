export interface CpfInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export interface UserData {
  id: number;
  nome: string | null;
  email: string | null;
  situacao: string;
  tipoId: number;
  configuracao: any;
  foto: string | null;
  perfilId: number;
  token: string;
  tokenExpiracao: string;
} 