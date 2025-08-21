import { useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  FolderOpen, 
  Kanban, 
  CheckSquare,
  GitBranch,
  Clock,
  FileText,
  Users,
  TrendingUp,
  Settings,
  Package,
  Archive,
  BarChart3,
  Calendar,
  MessageSquare
} from 'lucide-react';

const routeTitles: Record<string, { title: string; icon: React.ComponentType<{ className?: string }> }> = {
  '/projects/dashboard': { title: 'Project Dashboard', icon: LayoutGrid },
  '/projects/list': { title: 'All Projects', icon: FolderOpen },
  '/projects/active': { title: 'Active Projects', icon: FolderOpen },
  '/projects/archived': { title: 'Archived Projects', icon: Archive },
  '/projects/templates': { title: 'Project Templates', icon: Package },
  '/projects/tasks': { title: 'Task Management', icon: CheckSquare },
  '/projects/tasks/mine': { title: 'My Tasks', icon: CheckSquare },
  '/projects/kanban': { title: 'Kanban Board', icon: Kanban },
  '/projects/gantt': { title: 'Gantt Chart', icon: BarChart3 },
  '/projects/milestones': { title: 'Milestones', icon: GitBranch },
  '/projects/timeline': { title: 'Project Timeline', icon: Clock },
  '/projects/team': { title: 'Team Management', icon: Users },
  '/projects/team/members': { title: 'Team Members', icon: Users },
  '/projects/team/workload': { title: 'Team Workload', icon: BarChart3 },
  '/projects/documents': { title: 'Documents', icon: FileText },
  '/projects/discussions': { title: 'Discussions', icon: MessageSquare },
  '/projects/meetings': { title: 'Meetings', icon: Calendar },
  '/projects/reports': { title: 'Reports', icon: TrendingUp },
  '/projects/settings': { title: 'Project Settings', icon: Settings },
  '/projects/new': { title: 'Create New Project', icon: FolderOpen },
};

export function ContentTitle() {
  const location = useLocation();
  
  // Find the matching route or use a default
  const currentRoute = Object.keys(routeTitles).find(route => 
    location.pathname.startsWith(route)
  );
  
  const routeInfo = currentRoute 
    ? routeTitles[currentRoute] 
    : { title: 'Project Management', icon: FolderOpen };
  
  const Icon = routeInfo.icon;
  
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <h1 className="text-lg font-semibold text-foreground">
        {routeInfo.title}
      </h1>
    </div>
  );
}