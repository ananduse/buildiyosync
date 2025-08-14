'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  BarChart3, 
  MessageSquare, 
  Database, 
  Plus, 
  Settings,
  ChevronDown,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  Map,
  Grid,
  List,
  User,
  FileText,
  Target,
  Clock,
  TrendingUp,
  PieChart,
  Mail,
  Phone,
  Video,
  Sms,
  Headphones,
  Building,
  MapPin,
  Tag,
  Shield,
  Zap,
  Briefcase,
  Quote,
  CalendarDays,
  Bell,
  Megaphone,
  Wrench,
  UserCheck,
  FileSearch,
  GitBranch,
  Activity,
  Eye,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface NavigationItem {
  id: string;
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  isNew?: boolean;
  children?: NavigationItem[];
}

interface NavigationGroup {
  id: string;
  title: string;
  items: NavigationItem[];
}

const navigationData: NavigationGroup[] = [
  {
    id: 'core',
    title: 'Core Screens',
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        href: '/leads/dashboard',
        icon: BarChart3,
        badge: '15'
      },
      {
        id: 'leads',
        title: 'Lead Management',
        icon: Users,
        children: [
          {
            id: 'leads-list',
            title: 'All Leads',
            href: '/leads/list',
            icon: List
          },
          {
            id: 'leads-kanban',
            title: 'Kanban Board',
            href: '/leads/board',
            icon: Grid
          },
          {
            id: 'leads-calendar',
            title: 'Calendar View',
            href: '/leads/calendar',
            icon: Calendar
          },
          {
            id: 'leads-map',
            title: 'Map View',
            href: '/leads/map',
            icon: Map
          },
          {
            id: 'leads-detail',
            title: 'Lead Details',
            href: '/leads/detail',
            icon: User
          },
          {
            id: 'leads-add',
            title: 'Add Lead',
            href: '/leads/add',
            icon: Plus
          },
          {
            id: 'leads-import',
            title: 'Import/Export',
            href: '/leads/import-export',
            icon: RefreshCw
          }
        ]
      },
      {
        id: 'conversion',
        title: 'Lead Conversion',
        href: '/leads/conversion',
        icon: Target,
        isNew: true
      },
      {
        id: 'search',
        title: 'Advanced Search',
        href: '/leads/search',
        icon: Search
      },
      {
        id: 'timeline',
        title: 'Activity Timeline',
        href: '/leads/timeline',
        icon: Clock
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    items: [
      {
        id: 'comm-hub',
        title: 'Communication Hub',
        href: '/leads/communication/hub',
        icon: MessageSquare,
        badge: '12'
      },
      {
        id: 'email',
        title: 'Email Center',
        icon: Mail,
        children: [
          {
            id: 'email-composer',
            title: 'Email Composer',
            href: '/leads/communication/email-composer',
            icon: Mail
          },
          {
            id: 'email-templates',
            title: 'Email Templates',
            href: '/leads/communication/email-templates',
            icon: FileText
          }
        ]
      },
      {
        id: 'messaging',
        title: 'Messaging',
        icon: MessageSquare,
        children: [
          {
            id: 'whatsapp',
            title: 'WhatsApp Chat',
            href: '/leads/communication/whatsapp',
            icon: MessageSquare
          },
          {
            id: 'sms',
            title: 'SMS Center',
            href: '/leads/communication/sms',
            icon: Sms
          }
        ]
      },
      {
        id: 'calls',
        title: 'Call Center',
        href: '/leads/communication/call-center',
        icon: Phone
      },
      {
        id: 'comm-history',
        title: 'Communication History',
        href: '/leads/communication/history',
        icon: Clock
      },
      {
        id: 'comm-analytics',
        title: 'Communication Analytics',
        href: '/leads/communication/analytics',
        icon: TrendingUp
      }
    ]
  },
  {
    id: 'master-data',
    title: 'Master Data',
    items: [
      {
        id: 'lead-sources',
        title: 'Lead Sources',
        href: '/leads/master-data/lead-sources',
        icon: Database
      },
      {
        id: 'lead-statuses',
        title: 'Lead Statuses',
        href: '/leads/master-data/lead-statuses',
        icon: Tag
      },
      {
        id: 'lead-categories',
        title: 'Lead Categories',
        href: '/leads/master-data/lead-categories',
        icon: Grid
      },
      {
        id: 'industries',
        title: 'Industry Management',
        href: '/leads/master-data/industries',
        icon: Building
      },
      {
        id: 'project-types',
        title: 'Project Types',
        href: '/leads/master-data/project-types',
        icon: Briefcase
      },
      {
        id: 'locations',
        title: 'Location Masters',
        href: '/leads/master-data/locations',
        icon: MapPin
      },
      {
        id: 'team-management',
        title: 'Team Management',
        href: '/leads/master-data/team-management',
        icon: Users
      },
      {
        id: 'assignment-rules',
        title: 'Assignment Rules',
        href: '/leads/master-data/assignment-rules',
        icon: GitBranch
      },
      {
        id: 'scoring-rules',
        title: 'Scoring Rules',
        href: '/leads/master-data/scoring-rules',
        icon: Target
      },
      {
        id: 'workflow-automation',
        title: 'Workflow Automation',
        href: '/leads/master-data/workflow-automation',
        icon: Zap
      }
    ]
  },
  {
    id: 'additional',
    title: 'Additional Tools',
    items: [
      {
        id: 'activity-management',
        title: 'Activity Management',
        href: '/leads/additional/activity-management',
        icon: Activity
      },
      {
        id: 'task-management',
        title: 'Task Management',
        href: '/leads/additional/task-management',
        icon: FileText
      },
      {
        id: 'document-management',
        title: 'Document Management',
        href: '/leads/additional/document-management',
        icon: FileText
      },
      {
        id: 'proposal-management',
        title: 'Proposal Management',
        href: '/leads/additional/proposal-management',
        icon: FileText
      },
      {
        id: 'quote-generator',
        title: 'Quote Generator',
        href: '/leads/additional/quote-generator',
        icon: Quote
      },
      {
        id: 'meeting-scheduler',
        title: 'Meeting Scheduler',
        href: '/leads/additional/meeting-scheduler',
        icon: CalendarDays
      },
      {
        id: 'follow-up-manager',
        title: 'Follow-up Manager',
        href: '/leads/additional/follow-up-manager',
        icon: Bell
      },
      {
        id: 'campaign-manager',
        title: 'Campaign Manager',
        href: '/leads/additional/campaign-manager',
        icon: Megaphone
      },
      {
        id: 'lead-tools',
        title: 'Lead Tools',
        href: '/leads/additional/lead-tools',
        icon: Wrench
      },
      {
        id: 'bulk-operations',
        title: 'Bulk Operations',
        href: '/leads/additional/bulk-operations',
        icon: Users
      },
      {
        id: 'audit-trail',
        title: 'Audit Trail',
        href: '/leads/additional/audit-trail',
        icon: Shield
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    items: [
      {
        id: 'lead-analytics',
        title: 'Lead Analytics',
        href: '/leads/analytics/dashboard',
        icon: BarChart3
      },
      {
        id: 'report-builder',
        title: 'Report Builder',
        href: '/leads/analytics/report-builder',
        icon: PieChart,
        isNew: true
      },
      {
        id: 'custom-reports',
        title: 'Custom Reports',
        href: '/leads/analytics/custom-reports',
        icon: FileText
      },
      {
        id: 'export-center',
        title: 'Export Center',
        href: '/leads/analytics/export-center',
        icon: RefreshCw
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation & Workflows',
    items: [
      {
        id: 'workflow-builder',
        title: 'Workflow Builder',
        href: '/leads/automation/workflow-builder',
        icon: GitBranch,
        isNew: true
      },
      {
        id: 'trigger-events',
        title: 'Trigger Events',
        href: '/leads/automation/triggers',
        icon: Zap
      },
      {
        id: 'conditions',
        title: 'Condition Builder',
        href: '/leads/automation/conditions',
        icon: Filter
      },
      {
        id: 'actions',
        title: 'Action Blocks',
        href: '/leads/automation/actions',
        icon: Activity
      }
    ]
  }
];

export default function LeadNavigation() {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['core']));
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const NavigationItemComponent = ({ item, level = 0 }: { item: NavigationItem; level?: number }) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const active = isActive(item.href);

    const itemContent = (
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
          level > 0 && 'ml-6',
          active 
            ? 'bg-blue-100 text-blue-900' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        )}
        onClick={() => hasChildren ? toggleItem(item.id) : undefined}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        <span className="flex-1">{item.title}</span>
        {item.badge && (
          <Badge variant="secondary" className="h-5 text-xs">
            {item.badge}
          </Badge>
        )}
        {item.isNew && (
          <Badge className="h-5 text-xs bg-green-600">
            New
          </Badge>
        )}
        {hasChildren && (
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
    );

    return (
      <div>
        {item.href ? (
          <Link href={item.href}>
            {itemContent}
          </Link>
        ) : (
          itemContent
        )}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavigationItemComponent key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const filteredGroups = navigationData.map(group => ({
    ...group,
    items: group.items.filter(item => 
      searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.children && item.children.some(child => 
        child.title.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Lead Management</h1>
            <p className="text-xs text-gray-500">CRM System</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search navigation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <div key={group.id}>
              <div
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => toggleGroup(group.id)}
              >
                <span className="flex-1">{group.title}</span>
                <div className="flex-shrink-0">
                  {expandedGroups.has(group.id) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </div>
              </div>
              
              {expandedGroups.has(group.id) && (
                <div className="mt-2 space-y-1">
                  {group.items.map((item) => (
                    <NavigationItemComponent key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Link href="/leads/settings">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-3 px-3 py-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}