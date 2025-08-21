import { SidebarDefaultHeader } from './sidebar-default-header';
import { SidebarDefaultContent } from './sidebar-default-content';
import { SidebarDefaultFooter } from './sidebar-default-footer';

export function SidebarContent() {
  return (
    <div className="flex flex-col h-full">
      <SidebarDefaultHeader />
      <SidebarDefaultContent />
      <SidebarDefaultFooter />
    </div>
  );
}