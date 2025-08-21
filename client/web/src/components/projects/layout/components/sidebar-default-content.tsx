import { SidebarDefaultNav } from './sidebar-default-nav';
import { TooltipProvider } from '@/components/ui/tooltip';

export function SidebarDefaultContent() {
  return (
    <div className="flex flex-col grow overflow-y-auto overflow-x-hidden [scrollbar-width:thin] py-2">
      <TooltipProvider delayDuration={0}>
        <SidebarDefaultNav />
      </TooltipProvider>
    </div>
  );
}