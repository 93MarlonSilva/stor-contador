import { Icon } from "@tabler/icons-react";

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon: Icon;
}

export interface CloudItem extends NavItem {
  isActive?: boolean;
  items: {
    title: string;
    url: string;
  }[];
}

export interface DocumentItem {
  name: string;
  url: string;
  icon: Icon;
}

export interface RoutesData {
  user: User;
  navMain: NavItem[];
  navClouds: CloudItem[];
  navSecondary: NavItem[];
  documents: DocumentItem[];
} 