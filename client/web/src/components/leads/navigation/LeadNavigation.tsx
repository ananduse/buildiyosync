'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Smartphone,
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
  RefreshCw,
  Upload,
  Edit,
  MessageCircle,
  DollarSign,
  CheckSquare,
  Calculator,
  Globe,
  Layers,
  Copy,
  CheckCircle2,
  Trash2,
  Award,
  Scale,
  Share,
  StickyNote,
  ArrowRightLeft,
  Link as LinkIcon,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Lock,
  Gauge,
  Download,
  Code,
  Heart,
  UserPlus,
  Play,
  Cog,
  Template,
  Monitor,
  FileBarChart,
  FilePenLine,
  Crown,
  Compass,
  Timeline,
  FileSign,
  Repeat,
  Star
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
    id: 'overview',
    title: 'Overview',
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        href: '/leads/dashboard',
        icon: BarChart3,
        badge: '15'
      },
      {
        id: 'quick-actions',
        title: 'Quick Actions',
        icon: Zap,
        children: [
          {
            id: 'add-lead',
            title: 'Add New Lead',
            href: '/leads/add',
            icon: Plus
          },
          {
            id: 'import-leads',
            title: 'Import Leads',
            href: '/leads/import-export',
            icon: Upload
          },
          {
            id: 'bulk-actions',
            title: 'Bulk Operations',
            href: '/leads/additional/bulk-operations',
            icon: Users
          }
        ]
      },
      {
        id: 'recent-activity',
        title: 'Recent Activity',
        href: '/leads/timeline',
        icon: Clock
      }
    ]
  },
  {
    id: 'lead-management',
    title: 'Lead Management',
    items: [
      {
        id: 'views',
        title: 'Lead Views',
        icon: Eye,
        children: [
          {
            id: 'all-leads',
            title: 'All Leads',
            href: '/leads/list',
            icon: List,
            badge: '1,247'
          },
          {
            id: 'kanban-board',
            title: 'Kanban Board',
            href: '/leads/board',
            icon: Grid
          },
          {
            id: 'calendar-view',
            title: 'Calendar View',
            href: '/leads/calendar',
            icon: Calendar
          },
          {
            id: 'map-view',
            title: 'Map View',
            href: '/leads/map',
            icon: Map
          },
          {
            id: 'pipeline-view',
            title: 'Pipeline View',
            href: '/leads/pipeline',
            icon: TrendingUp,
            isNew: true
          }
        ]
      },
      {
        id: 'lead-operations',
        title: 'Lead Operations',
        icon: Settings,
        children: [
          {
            id: 'lead-detail',
            title: 'Lead Details',
            href: '/leads/detail',
            icon: User
          },
          {
            id: 'lead-conversion',
            title: 'Lead Conversion',
            href: '/leads/conversion',
            icon: Target,
            badge: 'New'
          },
          {
            id: 'advanced-search',
            title: 'Advanced Search',
            href: '/leads/search',
            icon: Search
          },
          {
            id: 'lead-scoring',
            title: 'Lead Scoring',
            href: '/leads/scoring',
            icon: Target
          }
        ]
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication Hub',
    items: [
      {
        id: 'communication-center',
        title: 'Communication Center',
        href: '/leads/communication/hub',
        icon: MessageSquare,
        badge: '12'
      },
      {
        id: 'email-marketing',
        title: 'Email Marketing',
        icon: Mail,
        children: [
          {
            id: 'email-composer',
            title: 'Compose Email',
            href: '/leads/communication/email-composer',
            icon: Edit
          },
          {
            id: 'email-templates',
            title: 'Email Templates',
            href: '/leads/communication/email-templates',
            icon: FileText,
            badge: '24'
          },
          {
            id: 'email-campaigns',
            title: 'Email Campaigns',
            href: '/leads/communication/campaigns',
            icon: Megaphone
          },
          {
            id: 'email-analytics',
            title: 'Email Analytics',
            href: '/leads/communication/email-analytics',
            icon: BarChart3
          }
        ]
      },
      {
        id: 'messaging-channels',
        title: 'Messaging Channels',
        icon: MessageSquare,
        children: [
          {
            id: 'whatsapp-business',
            title: 'WhatsApp Business',
            href: '/leads/communication/whatsapp',
            icon: MessageSquare,
            badge: '8'
          },
          {
            id: 'sms-marketing',
            title: 'SMS Marketing',
            href: '/leads/communication/sms',
            icon: Smartphone,
            badge: '3'
          },
          {
            id: 'live-chat',
            title: 'Live Chat',
            href: '/leads/communication/live-chat',
            icon: MessageCircle
          }
        ]
      },
      {
        id: 'voice-communication',
        title: 'Voice & Video',
        icon: Phone,
        children: [
          {
            id: 'call-center',
            title: 'Call Center',
            href: '/leads/communication/call-center',
            icon: Headphones
          },
          {
            id: 'video-meetings',
            title: 'Video Meetings',
            href: '/leads/communication/video-meetings',
            icon: Video
          },
          {
            id: 'call-analytics',
            title: 'Call Analytics',
            href: '/leads/communication/call-analytics',
            icon: BarChart3
          }
        ]
      },
      {
        id: 'communication-tracking',
        title: 'Communication Tracking',
        icon: Activity,
        children: [
          {
            id: 'communication-history',
            title: 'Communication History',
            href: '/leads/communication/history',
            icon: Clock
          },
          {
            id: 'interaction-timeline',
            title: 'Interaction Timeline',
            href: '/leads/communication/timeline',
            icon: Activity
          },
          {
            id: 'response-analytics',
            title: 'Response Analytics',
            href: '/leads/communication/analytics',
            icon: TrendingUp
          }
        ]
      }
    ]
  },
  {
    id: 'sales-operations',
    title: 'Sales Operations',
    items: [
      {
        id: 'sales-pipeline',
        title: 'Sales Pipeline',
        icon: TrendingUp,
        children: [
          {
            id: 'opportunity-management',
            title: 'Opportunity Management',
            href: '/leads/sales/opportunities',
            icon: Target
          },
          {
            id: 'deal-tracking',
            title: 'Deal Tracking',
            href: '/leads/sales/deals',
            icon: DollarSign
          },
          {
            id: 'forecasting',
            title: 'Sales Forecasting',
            href: '/leads/sales/forecasting',
            icon: TrendingUp
          }
        ]
      },
      {
        id: 'quotations-proposals',
        title: 'Quotations & Proposals',
        icon: FileText,
        children: [
          {
            id: 'quote-generator',
            title: 'Quote Generator',
            href: '/leads/additional/quote-generator',
            icon: Calculator
          },
          {
            id: 'proposal-management',
            title: 'Proposal Management',
            href: '/leads/additional/proposal-management',
            icon: FileText
          },
          {
            id: 'contract-management',
            title: 'Contract Management',
            href: '/leads/sales/contracts',
            icon: FileText
          }
        ]
      },
      {
        id: 'sales-activities',
        title: 'Sales Activities',
        icon: Activity,
        children: [
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
            id: 'task-management',
            title: 'Task Management',
            href: '/leads/additional/task-management',
            icon: CheckSquare
          }
        ]
      }
    ]
  },
  {
    id: 'automation-workflows',
    title: 'Automation & Workflows',
    items: [
      {
        id: 'workflow-designer',
        title: 'Workflow Designer',
        href: '/leads/automation/workflow-builder',
        icon: GitBranch,
        badge: 'New'
      },
      {
        id: 'automation-components',
        title: 'Automation Components',
        icon: Settings,
        children: [
          {
            id: 'trigger-events',
            title: 'Trigger Events',
            href: '/leads/automation/triggers',
            icon: Zap,
            badge: '15'
          },
          {
            id: 'condition-builder',
            title: 'Condition Builder',
            href: '/leads/automation/conditions',
            icon: Filter,
            badge: '8'
          },
          {
            id: 'action-blocks',
            title: 'Action Blocks',
            href: '/leads/automation/actions',
            icon: Play,
            badge: '12'
          }
        ]
      },
      {
        id: 'automation-templates',
        title: 'Automation Templates',
        icon: FileText,
        children: [
          {
            id: 'lead-nurturing',
            title: 'Lead Nurturing Templates',
            href: '/leads/automation/templates/nurturing',
            icon: Heart
          },
          {
            id: 'follow-up-sequences',
            title: 'Follow-up Sequences',
            href: '/leads/automation/templates/followup',
            icon: Repeat
          },
          {
            id: 'welcome-series',
            title: 'Welcome Series',
            href: '/leads/automation/templates/welcome',
            icon: UserPlus
          }
        ]
      },
      {
        id: 'automation-monitoring',
        title: 'Monitoring & Analytics',
        icon: Activity,
        children: [
          {
            id: 'workflow-analytics',
            title: 'Workflow Analytics',
            href: '/leads/automation/analytics',
            icon: BarChart3
          },
          {
            id: 'automation-logs',
            title: 'Automation Logs',
            href: '/leads/automation/logs',
            icon: FileText
          },
          {
            id: 'performance-metrics',
            title: 'Performance Metrics',
            href: '/leads/automation/metrics',
            icon: Gauge
          }
        ]
      }
    ]
  },
  {
    id: 'analytics-reporting',
    title: 'Analytics & Reporting',
    items: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        icon: BarChart3,
        children: [
          {
            id: 'lead-analytics',
            title: 'Lead Analytics',
            href: '/leads/analytics/dashboard',
            icon: TrendingUp
          },
          {
            id: 'sales-dashboard',
            title: 'Sales Dashboard',
            href: '/leads/analytics/sales-dashboard',
            icon: DollarSign
          },
          {
            id: 'performance-dashboard',
            title: 'Performance Dashboard',
            href: '/leads/analytics/performance-dashboard',
            icon: Activity
          },
          {
            id: 'executive-dashboard',
            title: 'Executive Dashboard',
            href: '/leads/analytics/executive-dashboard',
            icon: Star
          }
        ]
      },
      {
        id: 'report-builder',
        title: 'Report Builder',
        href: '/leads/analytics/report-builder',
        icon: PieChart,
        badge: 'New'
      },
      {
        id: 'reports',
        title: 'Reports',
        icon: FileText,
        children: [
          {
            id: 'standard-reports',
            title: 'Standard Reports',
            href: '/leads/analytics/standard-reports',
            icon: FileText
          },
          {
            id: 'custom-reports',
            title: 'Custom Reports',
            href: '/leads/analytics/custom-reports',
            icon: Edit
          },
          {
            id: 'scheduled-reports',
            title: 'Scheduled Reports',
            href: '/leads/analytics/scheduled-reports',
            icon: Clock
          }
        ]
      },
      {
        id: 'data-export',
        title: 'Data Export',
        icon: Download,
        children: [
          {
            id: 'export-center',
            title: 'Export Center',
            href: '/leads/analytics/export-center',
            icon: RefreshCw
          },
          {
            id: 'data-backup',
            title: 'Data Backup',
            href: '/leads/analytics/backup',
            icon: Shield
          },
          {
            id: 'api-access',
            title: 'API Access',
            href: '/leads/analytics/api',
            icon: Code
          }
        ]
      }
    ]
  },
  {
    id: 'data-management',
    title: 'Data Management',
    items: [
      {
        id: 'lead-data',
        title: 'Lead Data',
        icon: Database,
        children: [
          {
            id: 'lead-sources',
            title: 'Lead Sources',
            href: '/leads/master-data/lead-sources',
            icon: Globe,
            badge: '12'
          },
          {
            id: 'lead-statuses',
            title: 'Lead Statuses',
            href: '/leads/master-data/lead-statuses',
            icon: Tag,
            badge: '8'
          },
          {
            id: 'lead-categories',
            title: 'Lead Categories',
            href: '/leads/master-data/lead-categories',
            icon: Grid,
            badge: '6'
          },
          {
            id: 'lead-stages',
            title: 'Lead Stages',
            href: '/leads/master-data/lead-stages',
            icon: Layers
          }
        ]
      },
      {
        id: 'organizational-data',
        title: 'Organizational Data',
        icon: Building,
        children: [
          {
            id: 'industries',
            title: 'Industries',
            href: '/leads/master-data/industries',
            icon: Building
          },
          {
            id: 'company-sizes',
            title: 'Company Sizes',
            href: '/leads/master-data/company-sizes',
            icon: Users
          },
          {
            id: 'project-types',
            title: 'Project Types',
            href: '/leads/master-data/project-types',
            icon: Briefcase
          },
          {
            id: 'service-types',
            title: 'Service Types',
            href: '/leads/master-data/service-types',
            icon: Wrench
          }
        ]
      },
      {
        id: 'geographical-data',
        title: 'Geographical Data',
        icon: MapPin,
        children: [
          {
            id: 'countries',
            title: 'Countries',
            href: '/leads/master-data/countries',
            icon: Globe
          },
          {
            id: 'states-regions',
            title: 'States/Regions',
            href: '/leads/master-data/states',
            icon: Map
          },
          {
            id: 'cities',
            title: 'Cities',
            href: '/leads/master-data/cities',
            icon: MapPin
          },
          {
            id: 'territories',
            title: 'Sales Territories',
            href: '/leads/master-data/territories',
            icon: Compass
          }
        ]
      },
      {
        id: 'data-quality',
        title: 'Data Quality',
        icon: Shield,
        children: [
          {
            id: 'lead-tools',
            title: 'Lead Enrichment Tools',
            href: '/leads/additional/lead-tools',
            icon: Wrench
          },
          {
            id: 'duplicate-management',
            title: 'Duplicate Management',
            href: '/leads/data-quality/duplicates',
            icon: Copy
          },
          {
            id: 'data-validation',
            title: 'Data Validation',
            href: '/leads/data-quality/validation',
            icon: CheckCircle2
          },
          {
            id: 'data-cleanup',
            title: 'Data Cleanup',
            href: '/leads/data-quality/cleanup',
            icon: Trash2
          }
        ]
      }
    ]
  },
  {
    id: 'team-collaboration',
    title: 'Team & Collaboration',
    items: [
      {
        id: 'team-management',
        title: 'Team Management',
        icon: Users,
        children: [
          {
            id: 'team-members',
            title: 'Team Members',
            href: '/leads/master-data/team-management',
            icon: Users
          },
          {
            id: 'roles-permissions',
            title: 'Roles & Permissions',
            href: '/leads/team/roles',
            icon: Shield
          },
          {
            id: 'team-performance',
            title: 'Team Performance',
            href: '/leads/team/performance',
            icon: Award
          }
        ]
      },
      {
        id: 'assignment-rules',
        title: 'Assignment & Distribution',
        icon: GitBranch,
        children: [
          {
            id: 'assignment-rules',
            title: 'Assignment Rules',
            href: '/leads/master-data/assignment-rules',
            icon: GitBranch
          },
          {
            id: 'load-balancing',
            title: 'Load Balancing',
            href: '/leads/team/load-balancing',
            icon: Scale
          },
          {
            id: 'territory-management',
            title: 'Territory Management',
            href: '/leads/team/territories',
            icon: MapPin
          }
        ]
      },
      {
        id: 'collaboration-tools',
        title: 'Collaboration Tools',
        icon: Share,
        children: [
          {
            id: 'shared-notes',
            title: 'Shared Notes',
            href: '/leads/collaboration/notes',
            icon: StickyNote
          },
          {
            id: 'internal-messaging',
            title: 'Internal Messaging',
            href: '/leads/collaboration/messaging',
            icon: MessageSquare
          },
          {
            id: 'lead-handoffs',
            title: 'Lead Handoffs',
            href: '/leads/collaboration/handoffs',
            icon: ArrowRightLeft
          }
        ]
      }
    ]
  },
  {
    id: 'administration',
    title: 'Administration',
    items: [
      {
        id: 'system-config',
        title: 'System Configuration',
        icon: Settings,
        children: [
          {
            id: 'general-settings',
            title: 'General Settings',
            href: '/leads/admin/general-settings',
            icon: Settings
          },
          {
            id: 'email-settings',
            title: 'Email Configuration',
            href: '/leads/admin/email-settings',
            icon: Mail
          },
          {
            id: 'integration-settings',
            title: 'Integrations',
            href: '/leads/admin/integrations',
            icon: LinkIcon
          }
        ]
      },
      {
        id: 'scoring-rules',
        title: 'Business Rules',
        icon: Target,
        children: [
          {
            id: 'lead-scoring',
            title: 'Lead Scoring Rules',
            href: '/leads/master-data/scoring-rules',
            icon: Target
          },
          {
            id: 'qualification-criteria',
            title: 'Qualification Criteria',
            href: '/leads/admin/qualification',
            icon: CheckCircle
          },
          {
            id: 'escalation-rules',
            title: 'Escalation Rules',
            href: '/leads/admin/escalation',
            icon: AlertTriangle
          }
        ]
      },
      {
        id: 'compliance-security',
        title: 'Compliance & Security',
        icon: Shield,
        children: [
          {
            id: 'audit-trail',
            title: 'Audit Trail',
            href: '/leads/additional/audit-trail',
            icon: FileText
          },
          {
            id: 'data-privacy',
            title: 'Data Privacy (GDPR)',
            href: '/leads/admin/privacy',
            icon: ShieldCheck
          },
          {
            id: 'access-logs',
            title: 'Access Logs',
            href: '/leads/admin/access-logs',
            icon: Eye
          },
          {
            id: 'security-settings',
            title: 'Security Settings',
            href: '/leads/admin/security',
            icon: Lock
          }
        ]
      },
      {
        id: 'system-maintenance',
        title: 'System Maintenance',
        icon: Wrench,
        children: [
          {
            id: 'system-health',
            title: 'System Health',
            href: '/leads/admin/system-health',
            icon: Activity
          },
          {
            id: 'performance-monitoring',
            title: 'Performance Monitoring',
            href: '/leads/admin/performance',
            icon: Gauge
          },
          {
            id: 'system-logs',
            title: 'System Logs',
            href: '/leads/admin/logs',
            icon: FileText
          }
        ]
      }
    ]
  }
];

export default function LeadNavigation() {
  const location = useLocation();
  const pathname = location.pathname;
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['overview']));
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
          <Link to={item.href}>
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
          <Link to="/leads/settings">
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