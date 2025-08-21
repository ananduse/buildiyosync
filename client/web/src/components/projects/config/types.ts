import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  title: string;
  path?: string;
  icon?: LucideIcon;
  badge?: string;
  children?: NavItem[];
  pinned?: boolean;
  pinnable?: boolean;
  dropdown?: boolean;
}