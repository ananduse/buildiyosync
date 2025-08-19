import { SidebarDefaultNav } from "./sidebar-default-nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SidebarDefaultContent() {
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