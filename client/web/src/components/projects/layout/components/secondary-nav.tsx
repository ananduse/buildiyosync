import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutGrid, 
  Activity,
  Clock,
  Users,
  CheckSquare,
  DollarSign,
  FileText,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { value: 'overview', path: '/projects/dashboard', label: 'Overview', icon: LayoutGrid },
  { value: 'activity', path: '/projects/list', label: 'Activity', icon: Activity },
  { value: 'timeline', path: '/projects/timeline', label: 'Timeline', icon: Clock },
  { value: 'team', path: '/projects/team', label: 'Team', icon: Users },
  { value: 'tasks', path: '/projects/tasks', label: 'Tasks', icon: CheckSquare },
  { value: 'budget', path: '/projects/reports', label: 'Budget', icon: DollarSign },
  { value: 'documents', path: '/projects/documents', label: 'Documents', icon: FileText },
  { value: 'calendar', path: '/projects/tasks', label: 'Calendar', icon: Calendar },
  { value: 'reports', path: '/projects/reports', label: 'Reports', icon: TrendingUp },
];

export function SecondaryNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if we're in a project detail view
  const projectId = params.id || params.projectId;
  const isProjectDetail = !!projectId;

  useEffect(() => {
    const currentItem = navItems.find(item => 
      location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    );
    
    if (currentItem) {
      setActiveTab(currentItem.value);
    } else {
      setActiveTab('overview');
    }
  }, [location]);

  const handleTabChange = (value: string) => {
    const item = navItems.find(nav => nav.value === value);
    if (item) {
      navigate(item.path);
    }
  };

  // Don't show secondary nav when viewing individual project details
  // as the project detail view has its own tabs
  if (isProjectDetail) {
    return null;
  }

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