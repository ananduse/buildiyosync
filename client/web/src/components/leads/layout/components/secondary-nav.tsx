import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useEffect, useState } from 'react';

const navItems = [
  { value: 'dashboard', path: '/leads/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { value: 'list', path: '/leads/list', label: 'List View', icon: List },
  { value: 'board', path: '/leads/board', label: 'Pipeline', icon: Kanban },
  { value: 'analytics', path: '/leads/analytics', label: 'Analytics', icon: TrendingUp },
  { value: 'activities', path: '/leads/activities', label: 'Activities', icon: Calendar },
  { value: 'communications', path: '/leads/communications', label: 'Communications', icon: MessageSquare },
  { value: 'team', path: '/leads/team', label: 'Team', icon: Users },
  { value: 'map', path: '/leads/map', label: 'Map View', icon: Map },
  { value: 'search', path: '/leads/search', label: 'Search', icon: FileSearch },
  { value: 'settings', path: '/leads/settings', label: 'Settings', icon: Settings },
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