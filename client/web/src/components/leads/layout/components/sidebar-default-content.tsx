import { useState } from 'react';
import { SidebarDefaultNav } from "./sidebar-default-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarWorkspace } from "./sidebar-workspace";
import { useLayout } from './layout-context';

export function SidebarDefaultContent() {
  const { isWorkspaceMode, setIsWorkspaceMode } = useLayout();
  
  const handleSwitchToDefault = () => {
    setIsWorkspaceMode(false);
  };

  if (isWorkspaceMode) {
    return <SidebarWorkspace onSwitchToDefault={handleSwitchToDefault} />;
  }

  return (
    <div className="grow overflow-hidden">
      <ScrollArea className="h-full">
        <div className="py-3.5 space-y-3.5">
          <SidebarDefaultNav/>
        </div>
      </ScrollArea>
    </div>
  );
}