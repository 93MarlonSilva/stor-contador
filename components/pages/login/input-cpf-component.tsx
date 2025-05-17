"use client";

import { Mail } from "lucide-react";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function EmailInput({ value, onChange, error }: EmailInputProps) {
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue && !validateEmail(newValue)) {
      // Você pode adicionar uma lógica de validação aqui se necessário
    }
  };

  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-100 dark:text-gray-300">
        Email
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Mail className="h-5 w-5 text-primary dark:text-primary" />
        </div>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={value}
          onChange={handleChange}
          style={{ backgroundColor: '#1f2937', WebkitAppearance: 'none', appearance: 'none' }}
          className="block w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-200 dark:border-gray-500 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-none"
          placeholder="seu@email.com"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
} 