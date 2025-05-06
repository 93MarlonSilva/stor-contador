"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Building2, Users, Settings } from "lucide-react";

export default function AppSidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Empresas",
      href: "/empresas",
      icon: Building2,
      current: pathname === "/empresas",
    },
    {
      name: "Usuários",
      href: "/usuarios",
      icon: Users,
      current: pathname === "/usuarios",
    },
    {
      name: "Configurações",
      href: "/configuracoes",
      icon: Settings,
      current: pathname === "/configuracoes",
    },
  ];

  return (
    <div className="flex-1 flex flex-col space-y-4 p-8">
      {/* Rest of the component code remains unchanged */}
    </div>
  );
} 