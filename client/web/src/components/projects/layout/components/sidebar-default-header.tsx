import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, PanelRightOpen, Users, Building2, Briefcase, Check, Plus, Target } from 'lucide-react';
import { useLayout } from './layout-context';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Workspace {
  id: string;
  name: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  isCurrent: boolean;
}

const workspaces: Workspace[] = [
  {
    id: '1',
    name: 'Project Management',
    color: 'bg-purple-500',
    icon: Briefcase,
    isCurrent: true,
  },
  {
    id: '2',
    name: 'Lead Management',
    color: 'bg-blue-500',
    icon: Target,
    isCurrent: false,
  },
  {
    id: '3',
    name: 'Sales Pipeline',
    color: 'bg-emerald-500',
    icon: Briefcase,
    isCurrent: false,
  },
  {
    id: '4',
    name: 'Company CRM',
    color: 'bg-indigo-500',
    icon: Building2,
    isCurrent: false,
  },
];

export function SidebarDefaultHeader() {
  const { sidebarCollapse, toggleSidebarCollapse } = useLayout();
  const navigate = useNavigate();
  const [currentWorkspace, setCurrentWorkspace] = useState(
    workspaces.find(w => w.isCurrent) || workspaces[0]
  );

  const handleWorkspaceSwitch = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    workspaces.forEach(w => {
      w.isCurrent = w.id === workspace.id;
    });
    // Navigate to appropriate workspace dashboard
    if (workspace.name === 'Lead Management') {
      navigate('/leads/dashboard');
    } else if (workspace.name === 'Sales Pipeline') {
      navigate('/sales/dashboard');
    } else if (workspace.name === 'Company CRM') {
      navigate('/crm/dashboard');
    } else {
      navigate('/projects/dashboard');
    }
  };

  return (
    <div className="group flex justify-between items-center gap-2.5 border-b border-border h-11 lg:h-[var(--sidebar-header-height)] shrink-0 px-2.5">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center justify-between gap-2.5 px-1.5 hover:bg-accent -ms-0.5"
            >
              <span className={cn(
                "rounded-md text-white text-sm font-bold shrink-0 size-6 flex items-center justify-center",
                currentWorkspace.color
              )}>
                {currentWorkspace.name.split(' ').map(n => n[0]).join('')}
              </span>
              <span className={cn("text-foreground text-sm font-medium", sidebarCollapse && "hidden")}>
                {currentWorkspace.name}
              </span>
              <ChevronDown className={cn("size-4 text-muted-foreground", sidebarCollapse && "hidden")} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuGroup>
              {workspaces.map((workspace) => {
                const Icon = workspace.icon;
                return (
                  <DropdownMenuItem
                    key={workspace.id}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleWorkspaceSwitch(workspace)}
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "rounded-md text-white text-xs font-semibold shrink-0 size-5 flex items-center justify-center",
                        workspace.color
                      )}>
                        {workspace.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      <span className="truncate">{workspace.name}</span>
                    </div>
                    {workspace.isCurrent && (
                      <Check className="size-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/workspaces/new')}>
                <Plus className="size-4" />
                <span>New Workspace</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/projects/settings')}>
              <Building2 className="size-4" />
              <span>Workspace Settings</span>
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