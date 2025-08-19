import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  path?: string;
  badge?: string;
  pinnable?: boolean;
  pinned?: boolean;
  dropdown?: boolean;
  more?: boolean;
  new?: {
    tooltip: string;
    path: string;
  };
  children?: NavItem[];
}

export type NavConfig = NavItem[];

export interface LayoutContextType {
  sidebarCollapse: boolean;
  setSidebarCollapse: (value: boolean) => void;
  toggleSidebarCollapse: () => void;
  sidebarNavItems: NavConfig;
  pinnedNavItems: string[];
  pinSidebarNavItem: (id: string) => void;
  unpinSidebarNavItem: (id: string) => void;
  isSidebarNavItemPinned: (id: string) => boolean;
  getSidebarNavItems: () => NavConfig;
  isWorkspaceMode: boolean;
  setIsWorkspaceMode: (value: boolean) => void;
}