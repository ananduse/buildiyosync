import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutGrid, 
  FolderOpen, 
  Kanban, 
  CheckSquare,
  GitBranch,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Settings
} from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { value: 'dashboard', path: '/projects/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { value: 'projects', path: '/projects/list', label: 'Projects', icon: FolderOpen },
  { value: 'tasks', path: '/projects/tasks', label: 'Tasks', icon: CheckSquare },
  { value: 'kanban', path: '/projects/kanban', label: 'Kanban', icon: Kanban },
  { value: 'milestones', path: '/projects/milestones', label: 'Milestones', icon: GitBranch },
  { value: 'timeline', path: '/projects/timeline', label: 'Timeline', icon: Clock },
  { value: 'team', path: '/projects/team', label: 'Team', icon: Users },
  { value: 'documents', path: '/projects/documents', label: 'Documents', icon: FileText },
  { value: 'reports', path: '/projects/reports', label: 'Reports', icon: TrendingUp },
  { value: 'settings', path: '/projects/settings', label: 'Settings', icon: Settings },
];

export function SecondaryNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const currentItem = navItems.find(item => location.pathname.startsWith(item.path));
    if (currentItem) {
      setActiveTab(currentItem.value);
    }
  }, [location]);

  const handleTabChange = (value: string) => {
    const item = navItems.find(nav => nav.value === value);
    if (item) {
      navigate(item.path);
    }
  };

  return (
    <div className="bg-white border-b">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList 
          variant="line" 
          size="md"
          className="px-4 lg:px-6 gap-6 bg-transparent w-full justify-start overflow-x-auto [&_button]:border-b-2 [&_button_svg]:size-4 [&_button]:text-secondary-foreground"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <TabsTrigger key={item.value} value={item.value}>
                <Icon className="h-4 w-4" />
                {item.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}