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
  { value: 'overview', path: 'overview', label: 'Overview', icon: LayoutGrid },
  { value: 'activity', path: 'activity', label: 'Activity', icon: Activity },
  { value: 'timeline', path: 'timeline', label: 'Timeline', icon: Clock },
  { value: 'team', path: 'team', label: 'Team', icon: Users },
  { value: 'tasks', path: 'tasks', label: 'Tasks', icon: CheckSquare },
  { value: 'budget', path: 'budget', label: 'Budget', icon: DollarSign },
  { value: 'documents', path: 'documents', label: 'Documents', icon: FileText },
  { value: 'calendar', path: 'calendar', label: 'Calendar', icon: Calendar },
  { value: 'reports', path: 'reports', label: 'Reports', icon: TrendingUp },
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
    // Extract the last segment of the path to determine active tab
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    const currentItem = navItems.find(item => 
      item.value === lastSegment || item.path === lastSegment
    );
    
    if (currentItem) {
      setActiveTab(currentItem.value);
    } else if (isProjectDetail && !navItems.find(item => item.value === lastSegment)) {
      // If we're on a project detail page but no specific tab, default to overview
      setActiveTab('overview');
    }
  }, [location, isProjectDetail]);

  const handleTabChange = (value: string) => {
    const item = navItems.find(nav => nav.value === value);
    if (item) {
      if (isProjectDetail) {
        // Navigate within project context
        navigate(`/projects/${projectId}/${item.path}`);
      } else {
        // Navigate to general project sections
        navigate(`/projects/${item.path}`);
      }
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