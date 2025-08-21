import { 
  Users, 
  Briefcase, 
  ChevronDown,
  LayoutGrid,
  List,
  Kanban,
  TrendingUp,
  Calendar,
  MessageSquare,
  FileText,
  FolderOpen,
  CheckSquare,
  GitBranch,
  BarChart3,
  Clock,
  UserPlus,
  Upload,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function HeaderMainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLeadsActive = location.pathname.startsWith('/leads');
  const isProjectsActive = location.pathname.startsWith('/projects');

  return (
    <div className="flex items-center gap-2">
      {/* Leads Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 transition-colors",
              isLeadsActive 
                ? "text-white bg-zinc-800" 
                : "text-zinc-300 hover:text-white hover:bg-zinc-800"
            )}
          >
            <Users className="h-4 w-4 mr-1" />
            Leads
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Lead Management</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate('/leads/dashboard')}>
            <LayoutGrid className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/leads/list')}>
            <List className="mr-2 h-4 w-4" />
            All Leads
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/leads/board')}>
            <Kanban className="mr-2 h-4 w-4" />
            Pipeline View
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/leads/analytics')}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Analytics & Reports
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/leads/activities')}>
            <Calendar className="mr-2 h-4 w-4" />
            Activities
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/leads/communications')}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Communications
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate('/leads/add')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Lead
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/leads/import')}>
            <Upload className="mr-2 h-4 w-4" />
            Import Leads
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate('/leads/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Lead Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Projects Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 transition-colors",
              isProjectsActive 
                ? "text-white bg-zinc-800" 
                : "text-zinc-300 hover:text-white hover:bg-zinc-800"
            )}
          >
            <Briefcase className="h-4 w-4 mr-1" />
            Projects
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Project Management</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate('/projects/dashboard')}>
            <LayoutGrid className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/projects/list')}>
            <FolderOpen className="mr-2 h-4 w-4" />
            All Projects
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/projects/kanban')}>
            <Kanban className="mr-2 h-4 w-4" />
            Kanban Board
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/projects/tasks')}>
            <CheckSquare className="mr-2 h-4 w-4" />
            Tasks
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/projects/milestones')}>
            <GitBranch className="mr-2 h-4 w-4" />
            Milestones
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/projects/gantt')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Gantt Chart
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/projects/timeline')}>
            <Clock className="mr-2 h-4 w-4" />
            Timeline
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/projects/documents')}>
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate('/projects/new')}>
            <Briefcase className="mr-2 h-4 w-4" />
            Create New Project
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => navigate('/projects/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Project Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* You can add more main navigation items here like CRM, Sales, Marketing, etc. */}
    </div>
  );
}