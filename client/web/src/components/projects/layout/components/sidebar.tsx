import { SidebarContent } from './sidebar-content';
import { cn } from '@/lib/utils';
import { useLayout } from './layout-context';

export function Sidebar() {
  const { sidebarCollapse } = useLayout();
  
  return (
    <aside className={cn(
      "flex flex-col fixed z-[10] start-0 top-[var(--header-height)] bottom-0 bg-background border-e border-border",
      "[--sidebar-space-x:calc(var(--spacing)*2.5)]",
      "transition-[width] duration-200 ease-in-out",
      sidebarCollapse ? "w-[var(--sidebar-width-collapsed)]" : "w-[var(--sidebar-width)]"
    )}>
      <SidebarContent />
    </aside>
  );
}