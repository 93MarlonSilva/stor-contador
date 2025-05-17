"use client";

import { Lock } from "lucide-react";


export function PasswordInput({ value, onChange, error }: PasswordInputProps) {
  return (
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-white dark:text-gray-300">
        Senha
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock className="h-5 w-5 text-primary dark:text-primary" />
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ backgroundColor: '#1f2937', WebkitAppearance: 'none', appearance: 'none' }}
          className="block w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-200 dark:border-gray-500 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-none"
          placeholder="••••••••"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
} 