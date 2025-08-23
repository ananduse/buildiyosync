import { SidebarDefaultNav } from './sidebar-default-nav';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SidebarDefaultContent() {
  return (
    <div className="grow overflow-hidden">
      <ScrollArea className="h-full">
        <div className="py-3.5 space-y-3.5">
          <TooltipProvider delayDuration={0}>
            <SidebarDefaultNav />
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  );
}