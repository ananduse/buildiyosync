import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, PanelRightOpen, Users, Building2, Briefcase } from 'lucide-react';
import { useLayout } from './layout-context';
import { cn } from '@/lib/utils';

export function SidebarDefaultHeader() {
  const { sidebarCollapse, toggleSidebarCollapse } = useLayout();

  return (
    <div className="group flex justify-between items-center gap-2.5 border-b border-border h-11 lg:h-[var(--sidebar-header-height)] shrink-0 px-2.5">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="cursor-pointer group focus-visible:outline-hidden has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 text-accent-foreground hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground h-8.5 rounded-md text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60 select-none flex items-center justify-between gap-2.5 px-1.5 hover:bg-accent -ms-0.5"
            >
              <span className="rounded-md bg-blue-500 text-white text-sm shrink-0 size-6 flex items-center justify-center">
                L
              </span>
              <span className={cn("text-foreground text-sm font-medium", sidebarCollapse && "hidden")}>
                Leads CRM
              </span>
              <ChevronDown className={cn("size-4 text-muted-foreground", sidebarCollapse && "hidden")} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Lead Management</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building2 className="mr-2 h-4 w-4" />
              <span>Company CRM</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Sales Pipeline</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Button
        variant="ghost"
        className="cursor-pointer group focus-visible:outline-hidden items-center justify-center has-data-[arrow=true]:justify-between whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground rounded-md gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 text-muted-foreground w-8.5 h-8.5 p-0 [&_svg:not([class*=size-])]:size-4 hidden lg:group-hover:flex lg:in-data-[sidebar-collapsed]:hidden!"
        onClick={toggleSidebarCollapse}
      >
        <PanelRightOpen className="size-4" />
      </Button>
    </div>
  );
}