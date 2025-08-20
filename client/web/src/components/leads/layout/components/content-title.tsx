import { useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  List, 
  Kanban, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Calendar,
  Map,
  FileSearch,
  Settings,
  UserPlus,
  Upload,
  ArrowRightLeft,
  BarChart3,
  Activity
} from 'lucide-react';

const routeTitles: Record<string, { title: string; icon: React.ComponentType<{ className?: string }> }> = {
  '/leads/dashboard': { title: 'Dashboard', icon: LayoutGrid },
  '/leads/list': { title: 'All Leads', icon: List },
  '/leads/board': { title: 'Pipeline Board', icon: Kanban },
  '/leads/analytics': { title: 'Analytics & Reports', icon: TrendingUp },
  '/leads/activities': { title: 'Activities', icon: Activity },
  '/leads/communications': { title: 'Communications', icon: MessageSquare },
  '/leads/team': { title: 'Team Management', icon: Users },
  '/leads/map': { title: 'Map View', icon: Map },
  '/leads/search': { title: 'Advanced Search', icon: FileSearch },
  '/leads/settings': { title: 'Settings', icon: Settings },
  '/leads/add': { title: 'Add New Lead', icon: UserPlus },
  '/leads/import': { title: 'Import Leads', icon: Upload },
  '/leads/convert': { title: 'Convert Lead', icon: ArrowRightLeft },
  '/leads/reports': { title: 'Reports', icon: BarChart3 },
  '/leads/funnel': { title: 'Sales Funnel', icon: Kanban },
  '/leads/calendar': { title: 'Calendar View', icon: Calendar },
};

export function ContentTitle() {
  const location = useLocation();
  
  // Find the matching route or use a default
  const currentRoute = Object.keys(routeTitles).find(route => 
    location.pathname.startsWith(route)
  );
  
  const routeInfo = currentRoute 
    ? routeTitles[currentRoute] 
    : { title: 'Lead Management', icon: LayoutGrid };
  
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