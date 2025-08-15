'use client';

import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  Database, 
  Shield, 
  Settings,
  List,
  Grid,
  Calendar,
  Map,
  Target,
  Search,
  Clock,
  Mail,
  Phone,
  FileText,
  CalendarDays,
  Bell,
  Wrench,
  PieChart,
  Download,
  Activity,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isNew?: boolean;
}

// Core navigation links organized by importance and usage
const primaryLinks: SidebarLink[] = [
  {
    name: 'Dashboard',
    href: '/leads/dashboard',
    icon: BarChart3
  },
  {
    name: 'All Leads',
    href: '/leads/list',
    icon: List,
    badge: '1,247'
  },
  {
    name: 'Kanban Board',
    href: '/leads/board',
    icon: Grid
  },
  {
    name: 'Calendar View',
    href: '/leads/calendar',
    icon: Calendar
  },
  {
    name: 'Map View',
    href: '/leads/map',
    icon: Map
  }
];

const managementLinks: SidebarLink[] = [
  {
    name: 'Add New Lead',
    href: '/leads/add',
    icon: Users
  },
  {
    name: 'Lead Conversion',
    href: '/leads/conversion',
    icon: Target,
    isNew: true
  },
  {
    name: 'Advanced Search',
    href: '/leads/search',
    icon: Search
  },
  {
    name: 'Import/Export',
    href: '/leads/import-export',
    icon: Download
  }
];

const communicationLinks: SidebarLink[] = [
  {
    name: 'Communication Hub',
    href: '/leads/communication/hub',
    icon: MessageSquare,
    badge: '12'
  },
  {
    name: 'Email Composer',
    href: '/leads/communication/email-composer',
    icon: Mail
  },
  {
    name: 'Email Templates',
    href: '/leads/communication/email-templates',
    icon: FileText,
    badge: '24'
  },
  {
    name: 'Call Center',
    href: '/leads/communication/call-center',
    icon: Phone
  },
  {
    name: 'WhatsApp Business',
    href: '/leads/communication/whatsapp',
    icon: MessageSquare,
    badge: '8'
  }
];

const automationLinks: SidebarLink[] = [
  {
    name: 'Workflow Builder',
    href: '/leads/automation/workflow-builder',
    icon: Zap,
    isNew: true
  },
  {
    name: 'Trigger Events',
    href: '/leads/automation/triggers',
    icon: Target,
    badge: '15'
  },
  {
    name: 'Action Blocks',
    href: '/leads/automation/actions',
    icon: Activity,
    badge: '12'
  },
  {
    name: 'Condition Builder',
    href: '/leads/automation/conditions',
    icon: GitBranch,
    badge: '8'
  }
];

const analyticsLinks: SidebarLink[] = [
  {
    name: 'Lead Analytics',
    href: '/leads/analytics/dashboard',
    icon: BarChart3
  },
  {
    name: 'Report Builder',
    href: '/leads/analytics/report-builder',
    icon: PieChart,
    isNew: true
  },
  {
    name: 'Export Center',
    href: '/leads/analytics/export-center',
    icon: Download
  }
];

const toolsLinks: SidebarLink[] = [
  {
    name: 'Meeting Scheduler',
    href: '/leads/additional/meeting-scheduler',
    icon: CalendarDays
  },
  {
    name: 'Follow-up Manager',
    href: '/leads/additional/follow-up-manager',
    icon: Bell
  },
  {
    name: 'Lead Tools',
    href: '/leads/additional/lead-tools',
    icon: Wrench
  },
  {
    name: 'Bulk Operations',
    href: '/leads/additional/bulk-operations',
    icon: Users
  }
];

const adminLinks: SidebarLink[] = [
  {
    name: 'Lead Sources',
    href: '/leads/master-data/lead-sources',
    icon: Database,
    badge: '12'
  },
  {
    name: 'Team Management',
    href: '/leads/master-data/team-management',
    icon: Users
  },
  {
    name: 'Settings',
    href: '/leads/settings',
    icon: Settings
  },
  {
    name: 'Audit Trail',
    href: '/leads/additional/audit-trail',
    icon: Shield
  }
];

interface SidebarSectionProps {
  title: string;
  links: SidebarLink[];
  pathname: string;
}

function SidebarSection({ title, links, pathname }: SidebarSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {title}
      </h3>
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="flex-shrink-0 mr-3 h-5 w-5" />
              <span className="flex-1">{link.name}</span>
              {link.badge && (
                <span className={cn(
                  'ml-2 inline-block py-0.5 px-2 text-xs rounded-full',
                  isActive
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-gray-200 text-gray-600'
                )}>
                  {link.badge}
                </span>
              )}
              {link.isNew && (
                <span className="ml-2 inline-block py-0.5 px-2 text-xs rounded-full bg-green-200 text-green-800">
                  New
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function SimpleSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900">Lead Management</h1>
            <p className="text-sm text-gray-500">CRM System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <SidebarSection 
          title="Overview" 
          links={primaryLinks} 
          pathname={pathname} 
        />
        
        <SidebarSection 
          title="Lead Operations" 
          links={managementLinks} 
          pathname={pathname} 
        />
        
        <SidebarSection 
          title="Communication" 
          links={communicationLinks} 
          pathname={pathname} 
        />
        
        <SidebarSection 
          title="Automation" 
          links={automationLinks} 
          pathname={pathname} 
        />
        
        <SidebarSection 
          title="Analytics" 
          links={analyticsLinks} 
          pathname={pathname} 
        />
        
        <SidebarSection 
          title="Tools" 
          links={toolsLinks} 
          pathname={pathname} 
        />
        
        <SidebarSection 
          title="Administration" 
          links={adminLinks} 
          pathname={pathname} 
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span>System Online</span>
        </div>
      </div>
    </div>
  );
}