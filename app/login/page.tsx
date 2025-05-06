"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");

  const formatCpf = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");
    
    // Aplica a formatação do CPF
    if (numericValue.length <= 3) {
      return numericValue;
    } else if (numericValue.length <= 6) {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
    } else if (numericValue.length <= 9) {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
    } else {
      return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validação básica do CPF
    const cpfNumbers = cpf.replace(/\D/g, "");
    if (cpfNumbers.length !== 11) {
      setError("CPF inválido");
      return;
    }

    // Aqui você implementaria a lógica de autenticação
    // Por enquanto, vamos apenas redirecionar para o dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Fundo em tons de cinza muito claro */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-300" />
      
      {/* Efeito de triângulo otimizado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
          <div className="w-0 h-0 border-l-[80px] sm:border-l-[96px] md:border-l-[112px] border-l-transparent border-b-[160px] sm:border-b-[192px] md:border-b-[224px] border-b-[#008c6e] border-r-[80px] sm:border-r-[96px] md:border-r-[112px] border-r-transparent opacity-80 rotate-45 translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="absolute bottom-5 left-14 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
          <div className="w-0 h-0 border-l-[80px] sm:border-l-[96px] md:border-l-[112px] border-l-transparent border-t-[160px] sm:border-t-[192px] md:border-t-[224px] border-t-[#008c6e] border-r-[80px] sm:border-r-[96px] md:border-r-[112px] border-r-transparent opacity-80 -rotate-75 -translate-x-1/2 translate-y-1/2 origin-center" />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="w-full max-w-md space-y-6 relative z-10 bg-gradient-to-br from-zinc-500 via-neutral-800/20 to-zinc-500 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-xl">

        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-primary">Stor Contador</h1>
          <h2 className="text-2xl font-semibold mt-8 text-white">Bem-vindo</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-100 dark:text-gray-300">
                CPF
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-[#008c6e] dark:text-[#008c6e]" />
                </div>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  autoComplete="off"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  style={{ backgroundColor: '#1f2937', WebkitAppearance: 'none', appearance: 'none' }}
                  className="block w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-200 dark:border-gray-500 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-none"
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white dark:text-gray-300">
                Senha
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-[#008c6e] dark:text-[#008c6e]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: '#1f2937', WebkitAppearance: 'none', appearance: 'none' }}
                  className="block w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-200 dark:border-gray-500 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-500 dark:text-red-400 text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 text-sm sm:text-base border border-transparent rounded-md shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-white bg-[#008c6e] hover:bg-[#008c6e]/70 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-[#008c6e]"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 