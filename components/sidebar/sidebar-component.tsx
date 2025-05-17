"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconLogout,
  IconListDetails,
  IconReport,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";

import { NavDocuments } from "@/components/nav/nav-documents-component";
import { NavMain } from "@/components/nav/nav-main-component";
import { NavSecondary } from "@/components/nav/nav-secondary-component";
import { NavUser } from "@/components/nav/nav-user-component";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar-ui";
import { useRoutes } from "@/hooks/useRoutes-hook";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { getMainNav, getDocuments, getSecondaryNav, getUser } = useRoutes();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/dashboard192.png"
                    alt="Stor Contador"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                  <span className="text-base font-semibold">
                    Stor Contador
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getMainNav()} />
        <NavDocuments items={getDocuments()} />
        <NavSecondary items={getSecondaryNav()} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={getUser()} />
      </SidebarFooter>
    </Sidebar>
  );
}
