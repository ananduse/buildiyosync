import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Settings
} from 'lucide-react';

const navItems = [
  { path: '/leads/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { path: '/leads/list', label: 'List View', icon: List },
  { path: '/leads/board', label: 'Pipeline', icon: Kanban },
  { path: '/leads/analytics', label: 'Analytics', icon: TrendingUp },
  { path: '/leads/activities', label: 'Activities', icon: Calendar },
  { path: '/leads/communications', label: 'Communications', icon: MessageSquare },
  { path: '/leads/team', label: 'Team', icon: Users },
  { path: '/leads/map', label: 'Map View', icon: Map },
  { path: '/leads/search', label: 'Search', icon: FileSearch },
  { path: '/leads/settings', label: 'Settings', icon: Settings },
];

export function SecondaryNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b">
      <div className="px-4">
        <nav className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                  "hover:text-blue-600 hover:bg-blue-50 rounded-md",
                  isActive 
                    ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600" 
                    : "text-gray-600"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}