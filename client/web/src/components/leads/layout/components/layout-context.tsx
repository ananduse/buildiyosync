'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { type NavConfig, type LayoutContextType } from '../../config/types';

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: React.ReactNode;
  sidebarNavItems: NavConfig;
}

export function LayoutProvider({ children, sidebarNavItems }: LayoutProviderProps) {
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const [pinnedNavItems, setPinnedNavItems] = useState<string[]>(
    sidebarNavItems.filter(item => item.pinned).map(item => item.id)
  );
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(false);

  const toggleSidebarCollapse = useCallback(() => {
    setSidebarCollapse(prev => !prev);
  }, []);

  const pinSidebarNavItem = useCallback((id: string) => {
    setPinnedNavItems(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
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