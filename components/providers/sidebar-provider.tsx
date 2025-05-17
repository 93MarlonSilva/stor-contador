"use client"

import * as React from "react"
import { SidebarProvider as BaseSidebarProvider } from "@/components/ui/sidebar-ui"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseSidebarProvider defaultOpen={true}>
      {children}
    </BaseSidebarProvider>
  )
} 