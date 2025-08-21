import React, { createContext, useContext, useState } from 'react';
import { projectNavItems } from '@/components/projects/config/navigation';
import type { NavItem } from '@/components/projects/config/types';

interface LayoutContextType {
  sidebarCollapse: boolean;
  setSidebarCollapse: (collapse: boolean) => void;
  toggleSidebarCollapse: () => void;
  pinnedNavItems: string[];
  pinSidebarNavItem: (itemId: string) => void;
  getSidebarNavItems: () => NavItem[];
  isWorkspaceMode: boolean;
  setIsWorkspaceMode: (mode: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  sidebarCollapse: false,
  setSidebarCollapse: () => {},
  toggleSidebarCollapse: () => {},
  pinnedNavItems: [],
  pinSidebarNavItem: () => {},
  getSidebarNavItems: () => [],
  isWorkspaceMode: false,
  setIsWorkspaceMode: () => {},
});

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const [pinnedNavItems, setPinnedNavItems] = useState<string[]>([]);
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(false);

  const toggleSidebarCollapse = () => {
    setSidebarCollapse(!sidebarCollapse);
  };

  const pinSidebarNavItem = (itemId: string) => {
    setPinnedNavItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const getSidebarNavItems = () => {
    return projectNavItems;
  };

  return (
    <LayoutContext.Provider
      value={{
        sidebarCollapse,
        setSidebarCollapse,
        toggleSidebarCollapse,
        pinnedNavItems,
        pinSidebarNavItem,
        getSidebarNavItems,
        isWorkspaceMode,
        setIsWorkspaceMode,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};