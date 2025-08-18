import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  ShieldCheck,
  Package,
  ClipboardList,
  Truck,
  HardHat,
  Wrench,
  FolderOpen,
  Calculator,
  UserCheck,
  Clock,
  AlertTriangle,
  Target,
  GitBranch,
  CheckSquare,
  TrendingUp,
  Briefcase,
  Home,
  ChevronRight,
  Menu,
  X,
  Search,
  Moon,
  Sun,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children?: MenuItem[];
}

interface SidebarMenuModernProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarMenuModern({ isCollapsed, onToggle }: SidebarMenuModernProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['projects']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/',
      badge: '5',
      badgeVariant: 'destructive',
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: Building2,
      children: [
        { id: 'overview', label: 'Overview', icon: Home, path: '/projects' },
        { id: 'all-projects', label: 'All Projects', icon: Briefcase, path: '/projects/list', badge: '24' },
        { id: 'kanban', label: 'Kanban Board', icon: GitBranch, path: '/projects/kanban' },
        { id: 'timeline', label: 'Timeline', icon: Calendar, path: '/projects/timeline' },
        { id: 'milestones', label: 'Milestones', icon: Target, path: '/projects/milestones' },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, path: '/projects/tasks', badge: '12', badgeVariant: 'secondary' },
      ],
    },
    {
      id: 'estimation',
      label: 'Estimation',
      icon: Calculator,
      children: [
        { id: 'estimates', label: 'Cost Estimates', icon: FileText, path: '/projects/estimation' },
        { id: 'bids', label: 'Bids & Tenders', icon: TrendingUp, path: '/projects/bids' },
        { id: 'quotes', label: 'Quotations', icon: DollarSign, path: '/projects/quotes' },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: Users,
      children: [
        { id: 'team', label: 'Team Management', icon: UserCheck, path: '/resources/team' },
        { id: 'allocation', label: 'Resource Allocation', icon: Users, path: '/resources/allocation' },
        { id: 'timesheet', label: 'Timesheet', icon: Clock, path: '/resources/timesheet', badge: '3' },
        { id: 'attendance', label: 'Attendance', icon: ClipboardList, path: '/resources/attendance' },
      ],
    },
    {
      id: 'procurement',
      label: 'Procurement',
      icon: Package,
      children: [
        { id: 'materials', label: 'Materials', icon: Package, path: '/procurement/materials' },
        { id: 'vendors', label: 'Vendors', icon: Truck, path: '/procurement/vendors' },
        { id: 'purchase-orders', label: 'Purchase Orders', icon: FileText, path: '/procurement/orders', badge: '7' },
        { id: 'inventory', label: 'Inventory', icon: Package, path: '/procurement/inventory' },
      ],
    },
    {
      id: 'safety',
      label: 'Safety & Quality',
      icon: ShieldCheck,
      children: [
        { id: 'safety-management', label: 'Safety Management', icon: HardHat, path: '/safety/management' },
        { id: 'incidents', label: 'Incidents', icon: AlertTriangle, path: '/safety/incidents', badge: '2', badgeVariant: 'destructive' },
        { id: 'inspections', label: 'Inspections', icon: ClipboardList, path: '/safety/inspections' },
        { id: 'quality', label: 'Quality Control', icon: CheckSquare, path: '/safety/quality' },
      ],
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: DollarSign,
      children: [
        { id: 'budget', label: 'Budget Management', icon: DollarSign, path: '/finance/budget' },
        { id: 'invoices', label: 'Invoices', icon: FileText, path: '/finance/invoices', badge: '15' },
        { id: 'payments', label: 'Payments', icon: DollarSign, path: '/finance/payments' },
        { id: 'reports', label: 'Financial Reports', icon: BarChart3, path: '/finance/reports' },
      ],
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FolderOpen,
      path: '/documents',
      badge: 'New',
      badgeVariant: 'default',
    },
    {
      id: 'equipment',
      label: 'Equipment',
      icon: Wrench,
      path: '/equipment',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      path: '/reports',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (item: MenuItem) => {
    if (item.path && isActive(item.path)) return true;
    if (item.children) {
      return item.children.some(child => isActive(child.path));
    }
    return false;
  };

  const filteredMenuItems = menuItems.filter(item => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    
    const itemMatches = item.label.toLowerCase().includes(searchLower);
    const childMatches = item.children?.some(child => 
      child.label.toLowerCase().includes(searchLower)
    );
    
    return itemMatches || childMatches;
  });

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isParentActive(item);

    if (hasChildren) {
      return (
        <div key={item.id} className="mb-1">
          <Collapsible open={isExpanded}>
            <CollapsibleTrigger asChild>
              <button
                onClick={() => toggleExpanded(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  active && "bg-primary/10 text-primary font-medium",
                  level > 0 && "ml-4"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    "h-5 w-5",
                    active ? "text-primary" : "text-gray-500 dark:text-gray-400"
                  )} />
                  {!isCollapsed && (
                    <>
                      <span className="text-sm">{item.label}</span>
                      {item.badge && (
                        <Badge variant={item.badgeVariant || 'secondary'} className="ml-auto h-5 px-1.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )} />
                )}
              </button>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="mt-1 ml-4 space-y-1">
                {item.children?.map(child => renderMenuItem(child, level + 1))}
              </CollapsibleContent>
            )}
          </Collapsible>
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path || '#'}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          isActive(item.path) && "bg-primary/10 text-primary font-medium",
          level > 0 && "ml-4",
          "mb-1"
        )}
      >
        <item.icon className={cn(
          "h-5 w-5",
          isActive(item.path) ? "text-primary" : "text-gray-500 dark:text-gray-400"
        )} />
        {!isCollapsed && (
          <>
            <span className="text-sm">{item.label}</span>
            {item.badge && (
              <Badge variant={item.badgeVariant || 'secondary'} className="ml-auto h-5 px-1.5 text-xs">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    );
  };

  return (
    <div className={cn(
      "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">BuildSync Pro</h2>
              <p className="text-xs text-gray-500">Construction ERP</p>
            </div>
          </div>
        ) : (
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
            <Building2 className="h-5 w-5 text-white" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-gray-50 dark:bg-gray-800 border-0"
            />
          </div>
        </div>
      )}

      {/* Menu Items */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {filteredMenuItems.map(item => renderMenuItem(item))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        {!isCollapsed ? (
          <div className="space-y-3">
            {/* Quick Actions */}
            <div className="flex items-center justify-around">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">Project Manager</p>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}