import { useMemo } from 'react';
import { data } from '@/hooks/routes-hook';
import type { RoutesData } from '@/types/routes-types';

export function useRoutes() {
  // Memoize all getters to prevent unnecessary recreations
  const getMainNav = useMemo(() => () => data.navMain, []);
  const getCloudNav = useMemo(() => () => data.navClouds, []);
  const getSecondaryNav = useMemo(() => () => data.navSecondary, []);
  const getDocuments = useMemo(() => () => data.documents, []);
  const getUser = useMemo(() => () => data.user, []);

  return {
    routes: data,
    getMainNav,
    getCloudNav,
    getSecondaryNav,
    getDocuments,
    getUser,
  };
} 