import { ButtonHTMLAttributes } from "react";

export interface ButtonLoginProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
  }