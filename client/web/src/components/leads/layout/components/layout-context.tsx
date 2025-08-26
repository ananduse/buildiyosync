'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { type NavConfig, type LayoutContextType } from '../../config/types';
import { usePersistentState } from '@/hooks/use-persistent-state';

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: React.ReactNode;
  sidebarNavItems: NavConfig;
}

export function LayoutProvider({ children, sidebarNavItems }: LayoutProviderProps) {
  const [sidebarCollapse, setSidebarCollapse] = usePersistentState<boolean>(
    'leads-sidebar-collapsed',
    false
  );
  const [pinnedNavItems, setPinnedNavItems] = usePersistentState<string[]>(
    'leads-pinned-nav-items',
    sidebarNavItems.filter(item => item.pinned === true).map(item => item.id)
  );
  const [isWorkspaceMode, setIsWorkspaceMode] = usePersistentState<boolean>(
    'leads-workspace-mode',
    false
  );

  const toggleSidebarCollapse = useCallback(() => {
    setSidebarCollapse(prev => !prev);
  }, []);

  const pinSidebarNavItem = useCallback((id: string) => {
    setPinnedNavItems(prev => {
      if (prev.includes(id)) {
        // If item is already pinned, unpin it
        return prev.filter(itemId => itemId !== id);
      } else {
        // If item is not pinned, pin it
        return [...prev, id];
      }
    });
  }, []);

  const unpinSidebarNavItem = useCallback((id: string) => {
    setPinnedNavItems(prev => prev.filter(itemId => itemId !== id));
  }, []);

  const isSidebarNavItemPinned = useCallback((id: string) => {
    return pinnedNavItems.includes(id);
  }, [pinnedNavItems]);

  const getSidebarNavItems = useCallback(() => {
    return sidebarNavItems;
  }, [sidebarNavItems]);

  const value: LayoutContextType = {
    sidebarCollapse,
    setSidebarCollapse,
    toggleSidebarCollapse,
    sidebarNavItems,
    pinnedNavItems,
    pinSidebarNavItem,
    unpinSidebarNavItem,
    isSidebarNavItemPinned,
    getSidebarNavItems,
    isWorkspaceMode,
    setIsWorkspaceMode,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}