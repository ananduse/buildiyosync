import { cn } from '@/lib/utils';
import { SidebarMenu } from './sidebar-menu';

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  return (
    <div 
      className={cn(
        "fixed lg:top-(--header-height) top-0 bottom-0 z-20 lg:flex flex-col items-stretch shrink-0 group py-3 lg:py-0 border-r border-border",
        isCollapsed ? "w-[58px]" : "w-[240px]"
      )}
      style={{ 
        backgroundColor: '#f5f4f4',
        transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="flex grow shrink-0">
        <div className="kt-scrollable-y-auto grow gap-2.5 shrink-0 flex items-center flex-col max-h-[calc(100vh-8rem)] pb-16">
          <SidebarMenu isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  );
}
