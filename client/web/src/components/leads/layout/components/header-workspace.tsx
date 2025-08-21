import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  Settings,
  Building2,
  ChevronDown,
  Check,
  Plus,
  Crown,
  LogOut,
  Sun,
  Moon,
  Briefcase,
  Users,
  Target,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Workspace {
  id: string;
  name: string;
  color: string;
  type: 'leads' | 'crm' | 'sales' | 'marketing';
  members: number;
  isCurrent: boolean;
}

const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Lead Management',
    color: 'bg-blue-500',
    type: 'leads',
    members: 12,
    isCurrent: true,
  },
  {
    id: '2',
    name: 'Sales Pipeline',
    color: 'bg-emerald-500',
    type: 'sales',
    members: 8,
    isCurrent: false,
  },
  {
    id: '3',
    name: 'Marketing Hub',
    color: 'bg-purple-500',
    type: 'marketing',
    members: 15,
    isCurrent: false,
  },
  {
    id: '4',
    name: 'CRM Workspace',
    color: 'bg-indigo-500',
    type: 'crm',
    members: 20,
    isCurrent: false,
  },
];

export function HeaderWorkspace() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [currentWorkspace, setCurrentWorkspace] = useState(
    mockWorkspaces.find(w => w.isCurrent) || mockWorkspaces[0]
  );

  const handleWorkspaceSwitch = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    // Update the current workspace status
    mockWorkspaces.forEach(w => {
      w.isCurrent = w.id === workspace.id;
    });
    
    // Navigate to appropriate workspace
    if (workspace.type === 'crm') {
      navigate('/crm/dashboard');
    } else if (workspace.type === 'sales') {
      navigate('/sales/dashboard');
    } else if (workspace.type === 'marketing') {
      navigate('/marketing/dashboard');
    } else {
      navigate('/leads/dashboard');
    }
  };

  const getWorkspaceIcon = (type: string) => {
    switch (type) {
      case 'leads':
        return <Target className="size-3" />;
      case 'sales':
        return <Briefcase className="size-3" />;
      case 'marketing':
        return <Users className="size-3" />;
      case 'crm':
        return <Building2 className="size-3" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 px-2 h-8 text-zinc-100 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <span 
            className={cn(
              "rounded-md text-white text-xs font-bold shrink-0 size-6 flex items-center justify-center",
              currentWorkspace.color
            )}
          >
            {currentWorkspace.name.split(' ').map(n => n[0]).join('')}
          </span>
          <span className="text-sm font-medium hidden lg:block">
            {currentWorkspace.name}
          </span>
          <ChevronDown className="size-3 text-zinc-400 hidden lg:block" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-72" side="bottom" align="start" sideOffset={8}>
        {/* Current Workspace Info */}
        <div className="px-3 py-2 border-b">
          <div className="flex items-center gap-2">
            <span 
              className={cn(
                "rounded-md text-white text-sm font-bold shrink-0 size-8 flex items-center justify-center",
                currentWorkspace.color
              )}
            >
              {currentWorkspace.name.split(' ').map(n => n[0]).join('')}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium">{currentWorkspace.name}</p>
              <p className="text-xs text-muted-foreground">
                {currentWorkspace.members} members
              </p>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <DropdownMenuLabel className="text-xs">My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <User className="size-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings')}>
            <Settings className="size-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/billing')}>
            <Crown className="size-4" />
            <span>Upgrade Plan</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Workspaces Section */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs">Switch Workspace</DropdownMenuLabel>
        <DropdownMenuGroup>
          {mockWorkspaces.map((workspace) => (
            <DropdownMenuItem
              key={workspace.id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleWorkspaceSwitch(workspace)}
            >
              <div className="flex items-center gap-2">
                <span 
                  className={cn(
                    "rounded-md text-white text-xs font-semibold shrink-0 size-6 flex items-center justify-center",
                    workspace.color
                  )}
                >
                  {workspace.name.split(' ').map(n => n[0]).join('')}
                </span>
                <div className="flex-1">
                  <span className="text-sm">{workspace.name}</span>
                  <p className="text-xs text-muted-foreground">
                    {workspace.members} members · {getWorkspaceIcon(workspace.type)}
                  </p>
                </div>
              </div>
              {workspace.isCurrent && (
                <Check className="size-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate('/workspaces/new')}>
            <Plus className="size-4" />
            <span>Create New Workspace</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/leads/settings')}>
            <Building2 className="size-4" />
            <span>Workspace Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Theme Toggle */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="text-red-600" onClick={() => navigate('/logout')}>
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}