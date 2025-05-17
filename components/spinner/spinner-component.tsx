"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner-ui";
import { useRouteLoading } from "@/hooks/useRouteLoading-hook";

export function RouteLoading() {
  const isLoading = useRouteLoading();

  if (!isLoading) return null;

  return <LoadingSpinner />;
} 