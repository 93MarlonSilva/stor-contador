import {
  IconCamera,
  IconChartBar,
  IconLayoutDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconLogout,
  IconBuilding,
  IconListDetails,
  IconReport,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import type { RoutesData } from "@/types/routes-types";

// Memoize static data to prevent unnecessary recreations
export const data: RoutesData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/assets/dashboard192.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Empresas",
      url: "/company",
      icon: IconBuilding,
    },
    {
      title: "Métricas",
      url: "/metricas",
      icon: IconChartBar,
    },
    {
      title: "Projetos",
      url: "/projetos",
      icon: IconFolder,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Perfil",
      url: "/profile",
      icon: IconUsers,
    },
    {
      title: "Ajuda",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Sair",
      url: "/login",
      icon: IconLogout,
    },
  ],
  documents: [
    {
      name: "XML",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Documentos",
      url: "/documents",
      icon: IconReport,
    },
    {
      name: "Tributação",
      url: "/taxation",
      icon: IconFileWord,
    },
  ],
} as const; // Make the object immutable 