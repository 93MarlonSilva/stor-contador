"use client";

import { useState } from "react";
import { EmailInput } from "@/components/pages/login/input-cpf-component";
import { PasswordInput } from "@/components/pages/login/input-password-component";
import { LoginTriangles } from "@/components/pages/login/triangles-component";
import { ButtonLogin } from "@/components/ui/button-login-ui";
import { Footer } from "@/components/footer/footer-component";
import { LoadingSpinner } from "@/components/ui/loading-spinner-ui";
import { useAuthLogin } from "@/hooks/use-auth";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, isLoading, error } = useAuthLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Fundo em tons de cinza muito claro */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-300" />
      {/* Triângulos decorativos */}
      <LoginTriangles />
      {/* Card de login */}
      <div className="w-full max-w-md space-y-6 relative z-10 bg-gradient-to-br from-zinc-500 via-neutral-800/20 to-zinc-500 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-xl">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-primary">Stor Contador</h1>
          <h2 className="text-2xl font-semibold mt-8 text-white">Bem-vindo</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <EmailInput
              value={email}
              onChange={setEmail}
              error={error}
            />
            <PasswordInput
              value={password}
              onChange={setPassword}
            />
          </div>
          <div>
            <ButtonLogin type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </ButtonLogin>
          </div>
        </form>
      </div>
      <Footer />
      {isLoading && <LoadingSpinner />}
    </div>
  );
} 