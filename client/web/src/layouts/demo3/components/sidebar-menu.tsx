import {
  BarChart3,
  Bell,
  CheckSquare,
  Code,
  HelpCircle,
  MessageSquare,
  Settings,
  Shield,
  UserCircle,
  Users,
  Target,
  Building2,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Calculator,
  FileText,
  HardHat,
  Truck,
  ClipboardList,
  DollarSign,
  Calendar,
  AlertTriangle,
  Package,
  UserCheck,
  FolderOpen,
  Activity,
  PieChart,
  Home,
  Layers,
  GitBranch,
  Clock,
  FileCheck,
  Edit3,
  ShoppingCart,
  Wrench,
  MapPin,
  BarChart,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

export interface SubItem {
  path: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface Item {
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  title: string;
  newTab?: boolean;
  active?: boolean;
  subItems?: SubItem[];
}

interface SidebarMenuProps {
  isCollapsed: boolean;
}

export function SidebarMenu({ isCollapsed }: SidebarMenuProps) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(['Projects']);

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const items: Item[] = [
    {
      icon: BarChart3,
      path: '/',
      title: 'Dashboard',
    },
    {
      icon: UserCircle,
      path: '/public-profile/profiles/default',
      title: 'Profile',
    },
    {
      icon: Settings,
      path: '/account/home/get-started',
      title: 'Account',
    },
    {
      icon: Target,
      path: '/leads/dashboard',
      title: 'Leads',
    },
    {
      icon: Building2,
      title: 'Projects',
      active: location.pathname.startsWith('/projects'),
      subItems: [
        { path: '/projects/enterprise', title: 'Enterprise View', icon: Building2 },
        { path: '/projects', title: 'Overview', icon: Home },
        { path: '/projects/dashboard', title: 'Dashboard', icon: PieChart },
        { path: '/projects/list', title: 'Project List', icon: Layers },
        { path: '/projects/kanban', title: 'Kanban Board', icon: GitBranch },
        { path: '/projects/initiation', title: 'New Project', icon: Briefcase },
        { path: '/projects/estimation', title: 'Estimation & Bidding', icon: Calculator },
        { path: '/projects/timeline', title: 'Timeline & Gantt', icon: Calendar },
        { path: '/projects/tasks', title: 'Task Management', icon: CheckSquare },
        { path: '/projects/milestones', title: 'Milestones', icon: Target },
        { path: '/projects/resources', title: 'Resource Planning', icon: Users },
        { path: '/projects/budget', title: 'Budget & Cost', icon: DollarSign },
        { path: '/projects/materials', title: 'Materials', icon: Package },
        { path: '/projects/quality', title: 'Quality Control', icon: FileCheck },
        { path: '/projects/safety', title: 'Safety Management', icon: AlertTriangle },
        { path: '/projects/daily-followup', title: 'Daily Reports', icon: ClipboardList },
        { path: '/projects/documents', title: 'Documents', icon: FolderOpen },
        { path: '/projects/rfi', title: 'RFI & Submittals', icon: Edit3 },
        { path: '/projects/change-orders', title: 'Change Orders', icon: FileText },
        { path: '/projects/reports', title: 'Reports', icon: BarChart },
        { path: '/projects/analytics', title: 'Analytics', icon: Activity },
      ]
    },
    {
      icon: UserCheck,
      title: 'Workforce',
      subItems: [
        { path: '/workforce/employees', title: 'Employees', icon: Users },
        { path: '/workforce/subcontractors', title: 'Subcontractors', icon: Briefcase },
        { path: '/workforce/timesheet', title: 'Timesheet', icon: Clock },
        { path: '/workforce/attendance', title: 'Attendance', icon: UserCheck },
        { path: '/workforce/payroll', title: 'Payroll', icon: DollarSign },
      ]
    },
    {
      icon: Truck,
      title: 'Procurement',
      subItems: [
        { path: '/procurement/vendors', title: 'Vendors', icon: ShoppingCart },
        { path: '/procurement/purchase-orders', title: 'Purchase Orders', icon: FileText },
        { path: '/procurement/inventory', title: 'Inventory', icon: Package },
        { path: '/procurement/equipment', title: 'Equipment', icon: Wrench },
        { path: '/procurement/rentals', title: 'Rentals', icon: Truck },
      ]
    },
    {
      icon: HardHat,
      title: 'Site Management',
      subItems: [
        { path: '/site/locations', title: 'Site Locations', icon: MapPin },
        { path: '/site/inspections', title: 'Inspections', icon: ClipboardList },
        { path: '/site/permits', title: 'Permits', icon: FileCheck },
        { path: '/site/compliance', title: 'Compliance', icon: Shield },
      ]
    },
    {
      icon: Users,
      path: '/network/get-started',
      title: 'Network',
    },
    {
      icon: Shield,
      path: '/account/billing/plans',
      title: 'Plans',
    },
    {
      icon: MessageSquare,
      path: '/account/security/security-log',
      title: 'Security Logs',
    },
    {
      icon: Bell,
      path: '/account/notifications',
      title: 'Notifications',
    },
    {
      icon: CheckSquare,
      path: '/account/members/roles',
      title: 'ACL',
    },
    {
      icon: Code,
      path: '/account/api-keys',
      title: 'API Keys',
    },
    {
      icon: HelpCircle,
      path: 'https://docs.keenthemes.com/metronic-vite',
      title: 'Docs',
      newTab: true,
    },
  ];

  const renderMenuItem = (item: Item, index: number) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus.includes(item.title);
    const isActive = item.active || (item.path && location.pathname === item.path);

    if (isCollapsed) {
      return (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              shape="circle"
              mode="icon"
              {...(isActive ? { 'data-state': 'open' } : {})}
              className={cn(
                'data-[state=open]:bg-white data-[state=open]:border data-[state=open]:border-input data-[state=open]:text-primary',
                'hover:bg-white hover:border hover:border-input hover:text-primary',
              )}
              asChild={!hasSubItems}
            >
              {hasSubItems ? (
                <div onClick={() => toggleMenu(item.title)}>
                  <item.icon className="size-4.5!" />
                </div>
              ) : (
                <Link
                  to={item.path || ''}
                  {...(item.newTab
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <item.icon className="size-4.5!" />
                </Link>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
      );
    }

    if (hasSubItems) {
      return (
        <Collapsible key={index} open={isOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => toggleMenu(item.title)}
              className={cn(
                'w-full justify-between gap-3 px-3',
                isActive && 'bg-white text-primary',
                'hover:bg-white hover:text-primary',
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="size-4.5!" />
                <span>{item.title}</span>
              </div>
              {isOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 mt-1 space-y-1">
            {item.subItems.map((subItem, subIndex) => (
              <Button
                key={subIndex}
                variant="ghost"
                size="sm"
                className={cn(
                  'w-full justify-start gap-2 px-3 h-9',
                  location.pathname === subItem.path && 'bg-white text-primary',
                  'hover:bg-white hover:text-primary',
                )}
                asChild
              >
                <Link to={subItem.path}>
                  {subItem.icon && <subItem.icon className="size-3.5!" />}
                  <span className="text-sm">{subItem.title}</span>
                </Link>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Button
        key={index}
        variant="ghost"
        {...(isActive ? { 'data-state': 'open' } : {})}
        className={cn(
          'w-full justify-start gap-3 px-3',
          'data-[state=open]:bg-white data-[state=open]:text-primary',
          'hover:bg-white hover:text-primary',
        )}
        asChild
      >
        <Link
          to={item.path || ''}
          {...(item.newTab
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          <item.icon className="size-4.5!" />
          <span>{item.title}</span>
        </Link>
      </Button>
    );
  };

  return (
    <TooltipProvider>
      <div className={cn(
        "flex flex-col grow py-3.5 lg:py-0 gap-2.5",
        isCollapsed ? "items-center" : "px-3 w-full"
      )}>
        {items.map(renderMenuItem)}
      </div>
    </TooltipProvider>
  );
}